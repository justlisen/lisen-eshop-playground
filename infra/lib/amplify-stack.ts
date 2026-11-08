import * as cdk from 'aws-cdk-lib/core';
import * as amplify from 'aws-cdk-lib/aws-amplify';
import * as iam from 'aws-cdk-lib/aws-iam';
import { Construct } from 'constructs';

interface EshopAmplifyStackProps extends cdk.StackProps {
  userPoolId: string;
  userPoolClientId: string;
  dbSecretArn: string;
  imagesBucketUrl: string;
}

export class EshopAmplifyStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props: EshopAmplifyStackProps) {
    super(scope, id, props);

    const amplifyRole = new iam.Role(this, 'AmplifyRole', {
      assumedBy: new iam.ServicePrincipal('amplify.amazonaws.com'),
      managedPolicies: [
        iam.ManagedPolicy.fromAwsManagedPolicyName('AdministratorAccess-Amplify'),
      ],
    });

    // Create the Amplify app without a repository connection.
    // GitHub is connected manually in the Amplify console via OAuth (one-click).
    const app = new amplify.CfnApp(this, 'EshopApp', {
      name: 'lisen-eshop-playground',
      iamServiceRole: amplifyRole.roleArn,
      platform: 'WEB_COMPUTE',
      buildSpec: [
        'version: 1',
        'frontend:',
        '  phases:',
        '    preBuild:',
        '      commands:',
        '        - npm ci',
        '    build:',
        '      commands:',
        '        - npm run build',
        '  artifacts:',
        '    baseDirectory: .next',
        '    files:',
        '      - "**/*"',
        '  cache:',
        '    paths:',
        '      - node_modules/**/*',
      ].join('\n'),
      environmentVariables: [
        { name: 'NEXT_PUBLIC_USER_POOL_ID', value: props.userPoolId },
        { name: 'NEXT_PUBLIC_USER_POOL_CLIENT_ID', value: props.userPoolClientId },
        { name: 'NEXT_PUBLIC_IMAGES_CDN_URL', value: props.imagesBucketUrl },
      ],
    });

    new cdk.CfnOutput(this, 'AmplifyAppId', {
      value: app.attrAppId,
      description: 'Use this App ID to connect GitHub in the Amplify console',
    });
    new cdk.CfnOutput(this, 'AmplifyConsoleUrl', {
      value: `https://ap-southeast-1.console.aws.amazon.com/amplify/apps/${app.attrAppId}`,
    });
  }
}
