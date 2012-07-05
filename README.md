# Running GateIn on OpenShift

Follow this instructions to run [GateIn](http://www.jboss.org/gatein/) portal on OpenShift PaaS.

1. [Register](https://openshift.redhat.com/app/account/new) for OpenShift
1. Follow the [instructions](https://openshift.redhat.com/app/getting_started) to install client tools (step one)
1. Create a domain (step two on the link above)

1. Create JBoss AS applications:

        rhc app create -t jbossas-7 -a gatein

1. Remove OpenShift sample application

        cd gatein
        rm -r src/main/webapp/*
    
1. Use files from this github repo to add GateIn runtime and required modules to JBoss AS.
Avoiding conflicts specify git options to prefer this repo content. 

        git remote add gatein-openshift https://github.com/matejonnet/gatein-openshift.git
        git pull --depth=1 -s recursive -X theirs gatein-openshift master

1. Push everithing to OpenShift:

        git push origin master

1. Open GateIn portal in a web browser at \<your app name\>-\<your domain name\>.rhcloud.com.

