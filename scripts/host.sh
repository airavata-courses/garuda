#!/bin/bash
LOCAL_HOSTNAME=garuda.org
cat << EOF >> /etc/hosts
localhost $LOCAL_HOSTNAME
EOF