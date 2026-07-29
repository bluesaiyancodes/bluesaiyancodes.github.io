Forked from - [Academic Pages](https://github.com/academicpages/academicpages.github.io)


### Installation (Linux)

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
    bundle exec jekyll serve -l -H localhost
    ```
    Access the webpage from ```localhost:4000```

    If you are running on Linux host, it may be necessary to install some additional dependencies prior to being able to run locally:  
    ```sudo apt install build-essential gcc make```

### Installation (macOS)

1. Install [Homebrew](https://brew.sh/), then install rbenv, Ruby 3.3, and Node.js:
   ```bash
   brew install rbenv ruby-build node
   ```

2. Enable rbenv in zsh, then restart the shell:
   ```bash
   echo 'eval "$(rbenv init - zsh)"' >> ~/.zshrc
   exec zsh
   ```

3. From the project directory, install and select the supported Ruby version, then install Bundler and the project dependencies:
   ```bash
   rbenv install -s 3.3.10
   rbenv local 3.3.10
   gem install bundler
   bundle install
   ```

4. Generate the site and start the local server:
   ```bash
   bundle exec jekyll serve -l -H localhost
   ```

   Access the website at `http://localhost:4000`.
