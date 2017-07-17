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

underneath the covers this is 

    aws sts get-session-token --serial-number <mfa-arn> --token-code=<token>

I have multiple AWS accounts, and don't like needing to specify profiles, so I just use a bash function

```
aws-jon(){
    
}