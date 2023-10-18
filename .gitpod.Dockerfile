FROM gitpod/workspace-full

RUN sudo wget https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb
RUN sudo apt-get -q update
RUN sudo apt -y install ./google-chrome-stable_current_amd64.deb
RUN sudo apt-get -y install libnss3\
          libnspr4\
          libatk1.0-0\
          libatk-bridge2.0-0\
          libcups2\
          libdrm2\
          libxkbcommon0\
          libxcomposite1\
          libxdamage1\
          libxfixes3\
          libxrandr2\
          libgbm1\
          libgtk-3-0\
          libatspi2.0-0\
          libx11-xcb-dev
RUN sudo rm -rf /var/lib/apt/lists/*

RUN bash -c ". /home/gitpod/.sdkman/bin/sdkman-init.sh \
    && sdk update \
    && sdk install java 17.0.8-amzn \
    && sdk default java 17.0.8-amzn" 
