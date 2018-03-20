#!Groovy
@Library("platform.infrastructure.pipelinelibrary") _

DEVQA_ENV = "devqa"
INTEGRATION_ENV = "integration"
LIVE_ENV = "live"
AWS_REGION = "us-east-1"

// Global Pipeline Settings, like keep the 10 most recent builds, etc
withGlobalPipelineProperties () {

	// Begin Build/CI Section
	def buildNodeId = platformDefaults.getBuildNodeLabel()

	// Node properties to setup logs to send to aggr(sumo)
	withNodeWrapper(buildNodeId) {

    // deleteDir()

		//Checkout SCM
		stage("Checkout") {
      // Ensure we start with an empty directory.
			checkout scm
		}

		/*
		* Run npm build tasks -- npm install, test
		* Please ensure that npm test runs everything you need
		* Stages: Build/Test
		*/
		stage ('Build/Test') {
      sh '/opt/node/bin/npm --version' // Want this in the build log
      sh '/opt/node/bin/npm install'   // Install dependencies
      sh '/opt/node/bin/npm run test -- --coverage'    // Run tests
		}

    /*
    * Run the sonar scanner to verify code quality
    * Stages: Sonar
    */

    sh 'sudo bash'
    // gulpSonarScan()
    // stage('SonarScan for JS'){
    //   sh 'gulp sonar'
    // }

		//Create Docker image and upload to ECR
    stage('Docker Build') {
		  dockerBuildPush()
    }

    // End Build/CI Section
    // Begin Deploy/CD Section

    def ecsDeployParametersPath = 'cloudformation/deploy/parameters.json'

		//eis-deliverydevqa
		withDeployWrapper(DEVQA_ENV) {
      ecsDeploy deployEnv: DEVQA_ENV,  parametersPath: ecsDeployParametersPath
      performRelease releaseMethod: 'fast', deployEnv: DEVQA_ENV
		}

    return 0; // TODO - remove this line when ready to bring in integration and live.
    //Integration and Live Deployments
    if(env.BRANCH_NAME != "master"){
      println "No promotion past devqa on a branch which is not master"
      return 0;
    }


		//eis-deliveryintegration
		withDeployWrapper(INTEGRATION_ENV){
			ecsDeploy deployEnv: INTEGRATION_ENV,  parametersPath: ecsDeployParametersPath
      sh "sleep 90"
      stage('End-to-End Testing') {
        withCredentials([usernamePassword(credentialsId: 'saucelabs_api_key', usernameVariable: 'SAUCE_USERNAME', passwordVariable: 'SAUCE_ACCESS_KEY')]) {
          sh "export TEST_ENV=${INTEGRATION_ENV} && npm run e2e:ci"
        }
      }
			performRelease releaseMethod: 'fast', deployEnv: INTEGRATION_ENV
		}

		//eis-deliverylive
		withDeployWrapper(LIVE_ENV){
			ecsDeploy deployEnv: LIVE_ENV,  parametersPath: ecsDeployParametersPath
      sh "sleep 90"
      stage('End-to-End Testing') {
        withCredentials([usernamePassword(credentialsId: 'saucelabs_api_key', usernameVariable: 'SAUCE_USERNAME', passwordVariable: 'SAUCE_ACCESS_KEY')]) {
          sh "export TEST_ENV=${LIVE_ENV} && npm run e2e:ci"
        }
      }
			performRelease releaseMethod: 'canary', deployEnv: LIVE_ENV
		}

	}

	// End Deploy/CD Section
}