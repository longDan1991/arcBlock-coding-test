## Run and debug locally

If you have not installed ABT Node locally, you can do it using the following: 
```shell
yarn global add @abtnode/cli
```
You can get more details from [Get started with ABT Node](https://www.arcblock.io/en/get-started) page or if you need help installing ABT Node. 

Clone the repo and start development using a debug mode ABT Node instance inside this project:
```shell
git clone git@github.com:blocklet/react-demo.git
cd react-demo
yarn
abtnode init --mode debug
abtnode start
blocklet dev
```
