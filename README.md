---
layout: default
title: README
---
# README

## このテンプレートについて

GitHub Pages でサイトやアプリを公開するのに使うシンプルテンプレートです。テンプレートエンジンとしては GitHub Pages でサポートされている Jekyll (プラグイン無し) を使い、それでは実現できない JS/CSS 最小化や LESS コンパイルなどの処理は Grunt スクリプトをローカルで使用するという想定です。今時の Web 開発で必須であろう、ファイル変更時にブラウザでページを自動再読込させるライブリロード機能も Grunt スクリプトで書いています。

## 使い方

* ファイルを編集して grunt して GitHub Pages に push してください。
* 開発時は grunt live して http://localhost:8000/ でライブリロードしながら開発してください。

## ファイル構成

* _includes - Jekyll インクルードファイルディレクトリ。js/css はこの配下にあるファイルを Jekyll で連結出力するよう指定するためこの配下にオリジナルを置きます。
* _layouts - Jekyll テンプレートディレクトリ
* _site - Jekyll 返還後の出力ディレクトリ
* node_modules - Grunt スクリプトを使うために npm install したらできる
* _config_yml - Jekyll 設定ファイル。JS/CSS 最小化のオンオフなどはここで制御
* CNAME - GitHub Pages で独自ドメインを指定するファイル
* Gruntfile.js - Grunt スクリプト。grunt コマンドで一通り自動生成。grunt live でライブリロードサーバを http://localhost:8000/ として起動
* package.json - Grunt スクリプトで必要な Node パッケージの情報
* その他 - [Initializr](http://www.initializr.com/) の Twitter Bootstrap ベースのサンプル。

## 参考リンク

* [Jekyll テンプレートエンジン](https://github.com/mojombo/jekyll)
  * ベースは [Liquid エンジン](https://github.com/Shopify/liquid)
  * [Liquid エンジンのマークアップ](https://github.com/Shopify/liquid/wiki/Liquid-for-Designers)
* [GitHub Flavored Markdown エンジン (redcarpet)](https://github.com/vmg/redcarpet)
* [Grunt: The JavaScript Task Runner](http://gruntjs.com/)
* [Twitter Bootstrap](http://twitter.github.com/bootstrap/)
