Forked from - [Academic Pages](https://github.com/academicpages/academicpages.github.io)


### Installation
1.  Install ruby-dev, bundler, and nodejs
    ```bash
    sudo apt install ruby-dev ruby-bundler nodejs
    ```

    If you see error ```Unable to locate package ruby-bundler```, ```Unable to locate package nodejs``` , run the following:
    ```bash
    sudo apt update && sudo apt upgrade -y
    ```
    then try run ```sudo apt install ruby-dev ruby-bundler nodejs``` again.


2.  Install ruby dependencies
    ```bash
    bundle install
    ```
    if there are any errors refer [Academic Pages](https://github.com/academicpages/academicpages.github.io)

3.  Generate the HTML and serve on local server
    ```bash
    jekyll serve -l -H localhost
    ```
    Access the webpage from ```localhost:4000```

    If you are running on Linux host, it may be necessary to install some additional dependencies prior to being able to run locally:  
    ```sudo apt install build-essential gcc make```
