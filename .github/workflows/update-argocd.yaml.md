name: UpdateYamlFile

on:
  push:
    branches: [ "master" ]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
    - name: Clone Repository
      run: |
        git clone https://WilfredAlmeida:${{secrets.ARGOCD_CONFIGS_REPO_ACCESS_TOKEN}}@github.com/WilfredAlmeida/argocd-test-configs
    - name: Install yq
      run: |
        sudo wget -qO /usr/local/bin/yq https://github.com/mikefarah/yq/releases/latest/download/yq_linux_amd64
        sudo chmod a+x /usr/local/bin/yq
    - name: Update YAML File
      run: |
        yq -i '.spec.template.spec.containers[0].image = "hub.wilfredalmeida.com/email-generator/email-gen-img:7"' 'argocd-test-configs/node-pod.yaml'
    - name: Push to Repo
      run: |
        git config --global user.name "${{secrets.USERNAME_GITHUB}}"
        git config --global user.email "${{secrets.EMAIL_GITHUB}}"
        cd argocd-test-configs
        git add .
        git commit -m "Updated by GitHub Actions"
        git push https://${{secrets.USERNAME_GITHUB}}:${{secrets.ARGOCD_CONFIGS_REPO_ACCESS_TOKEN}}@github.com/WilfredAlmeida/argocd-test-configs --all
