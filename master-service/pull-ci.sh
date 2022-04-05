#!/bin/bash

# Change working directory
cd $HOME

# Initialize ssh service
eval $(ssh-agent -s)

# Add key to ssh-agent
ssh-add ci-services/key

# Stop kube pods
# TO DO: Add script to remove kube pods

# Remove current github files
rm -rf garuda/

# Pull new repo from github
git clone git@github.com:airavata-courses/garuda.git

# Start new pods
sh garuda/kubernetes/kubernetes_init.sh
