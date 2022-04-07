#!/bin/bash
LOCAL_HOSTNAME=garuda.org
cat << EOF >> /etc/hosts
149.165.154.67 $LOCAL_HOSTNAME
EOF