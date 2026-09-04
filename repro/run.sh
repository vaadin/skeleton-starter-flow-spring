#!/bin/bash
# Reproduces "IllegalStateException: Can not process requests before init() has
# been called" by simulating a stale browser tab whose push connection keeps
# reconnecting to localhost:8080 while a fresh server boots on that port.
#
# usage: repro/run.sh [tag]
set -u
DIR="$(cd "$(dirname "$0")" && pwd)"
PROJ="$(dirname "$DIR")"
TAG="${1:-run}"
cd "$PROJ"

[ -f "$DIR/cp.txt" ] || ./mvnw -B -q dependency:build-classpath -Dmdep.outputFile="$DIR/cp.txt"
./mvnw -B -q compile

node "$DIR/probe.js" > "$DIR/probe-$TAG.log" 2>&1 &
PROBE=$!
sleep 0.5
env VAADIN_USAGE_STATS_ENABLED=false java -Dvaadin.launch-browser=false \
  -cp "target/classes:src/main/resources:$(cat "$DIR/cp.txt")" \
  org.vaadin.example.Application > "$DIR/srv-$TAG.log" 2>&1 &
SRV=$!
for _ in $(seq 1 60); do
  sleep 1
  grep -q "Started Application" "$DIR/srv-$TAG.log" && break
done
sleep 2
kill $SRV $PROBE 2>/dev/null; wait $SRV 2>/dev/null

echo "[$TAG] 'Can not process requests before init()' occurrences: $(grep -c 'Can not process requests before init' "$DIR/srv-$TAG.log")"
grep -h "FIRST-WS-OPEN" "$DIR/probe-$TAG.log" | head -1
grep -h "Tomcat started on port" "$DIR/srv-$TAG.log" | head -1
