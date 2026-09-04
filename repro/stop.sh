#!/bin/sh
for p in $(pgrep -f "vaadin.example.App""lication" 2>/dev/null); do
  c=$(cat /proc/$p/comm 2>/dev/null)
  case "$c" in java|node) kill $p 2>/dev/null ;; esac
done
for p in $(pgrep -f "probe""\.js" 2>/dev/null); do
  c=$(cat /proc/$p/comm 2>/dev/null)
  case "$c" in node) kill $p 2>/dev/null ;; esac
done
sleep 2
echo stopped
