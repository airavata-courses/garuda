#!/bin/bash

read -r -p "What do you want to delete from garuda applications ? [all/state/deploy] " input

case $input in
      [a][l][l])
            ## removing entire rabbit-mq stack ##
            echo "## removing entire rabbit-mq stack ##"
            kubectl delete -n rabbits -f rabbit-rbac.yaml
            kubectl delete -n rabbits -f rabbit-configmap.yaml
            kubectl delete -n rabbits -f rabbit-secret.yaml
            kubectl delete -n rabbits -f rabbit-statefulset.yaml
            kubectl delete ns rabbits

            echo "## garuda remove exisiting deployments ##"
            ## garuda remove exisiting deployments ##
            kubectl delete -f garuda_deploy_deployment.yaml

            ## garuda application statefulset deployment ##
            echo "## garuda application statefulset deployment ##"
            kubectl delete -f garuda_deploy_statefull_set.yaml
            ;;
      [s][t][a][t][e])
            ## removing entire rabbit-mq stack ##
            echo "## removing entire rabbit-mq stack ##"
            kubectl delete -n rabbits -f rabbit-rbac.yaml
            kubectl delete -n rabbits -f rabbit-configmap.yaml
            kubectl delete -n rabbits -f rabbit-secret.yaml
            kubectl delete -n rabbits -f rabbit-statefulset.yaml
            kubectl delete ns rabbits

            ## garuda application statefulset deployment ##
            echo "## garuda application statefulset deployment ##"
            kubectl delete -f garuda_deploy_statefull_set.yaml
            ;;
      [d][e][p][l][o][y])
            echo "## garuda remove exisiting deployments ##"
            ## garuda remove exisiting deployments ##
            kubectl delete -f garuda_deploy_deployment.yaml
            ;;
      *)
            echo "deletion skipped...phew"
            exit 1
            ;;
esac