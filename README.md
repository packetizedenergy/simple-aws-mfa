## AWS-MFA

Making MFA easier

First you should configure MFA in your account by adding the following to the actions your cli user is authorized to

```json
"Condition":
{
    "Null":{"aws:MultiFactorAuthAge":"false"}
}
```

then take note of you MFA ARN

<img src="./docs/where-to-find-mfa-arn.png"/> 

then execute the following

    eval $(npx simple-aws-mfa <mfa-arn> <token>)

this could be wrapped into a bash function

```sh
aws-mfa-login(){
    eval $(npx simple-aws-mfa <mfa-arn> $1)
}
```

and called without the mfa-arn

    aws-mfa-login <token>   

or if you have multiple aws accounts

```sh
aws-account1(){
    export AWS_SECRET_ACCESS_KEY="..."
    export AWS_ACCESS_KEY_ID="..."
    eval $(npx simple-aws-mfa <mfa-arn-1> $1)
}

aws-account2(){
    export AWS_SECRET_ACCESS_KEY="..."
    export AWS_ACCESS_KEY_ID="..."
    eval $(npx simple-aws-mfa <mfa-arn-2> $1)
}
```

Note that after logging in, your `AWS_SECRET_ACCESS_KEY` and `AWS_ACCESS_KEY_ID` will be stomped on by the STS values from your MFA. So you should close your bash session and create a new one to start from scratch. 