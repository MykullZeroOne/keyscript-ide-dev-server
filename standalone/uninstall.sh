#!/bin/bash

PLIST_NAME="com.revfcu.corelation-service"
PLIST_PATH="$HOME/Library/LaunchAgents/$PLIST_NAME.plist"
INSTALL_DIR="$HOME/.corelation-service"

launchctl unload "$PLIST_PATH" 2>/dev/null
rm -f "$PLIST_PATH"
rm -rf "$INSTALL_DIR"

echo "Corelation Service Mock uninstalled."
