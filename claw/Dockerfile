FROM ghcr.io/openclaw/openclaw:latest

# Keep the default OpenClaw runtime state inside the container volume.
VOLUME ["/home/node/.openclaw"]

# OpenClaw Control UI and gateway live on this port.
EXPOSE 18789

# The upstream image already provides the runtime entrypoint and onboarding flow.
