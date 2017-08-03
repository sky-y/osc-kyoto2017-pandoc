---
title: Pandoc入門：MarkdownからHTML・PDF・Writer/Word文書・スライドを生成する
author: 藤原 由来
date: 2017年8月4日
revealjs-url: reveal.js-3.4.0
theme: sky-sky-y
transition: fade
transitionSpeed: fast
slideNumber: true
history: false
margin: 0
...

----

# この発表について

- 文書変換ツール「Pandoc」の入門セミナーです
- 対象者
    - ドキュメンテーション（文書の作成・処理）に興味のある方
    - 文書の作成・処理を効率化したい方
    - Markdownなどの軽量マークアップ言語をうまく活用したい方
- 前提とする知識：基本的なコマンドラインの使い方
    - ターミナル (Linux/Mac)
    - コマンドプロンプト (Windows)

----

# 自己紹介

- 名前
    - 藤原 由来 (本名, [GitHub](https://github.com/sky-y))
    - 藤原 惟（[ブログ](http://www.3rd-p-zombie.net/)）
    - すかいゆき（[Twitter](https://twitter.com/sky_y)）
- 職業
    - フリープログラマ・技術ライター
    - 専門学校 非常勤講師

----

# Pandocに関する活動

- Pandocユーザーズガイドを和訳
    - [Pandoc ユーザーズガイド 日本語版](http://sky-y.github.io/site-pandoc-jp/users-guide/)
    - バージョンが古くなったので、改訂を予定
- Qiita等に記事執筆
    - [多様なフォーマットに対応！ドキュメント変換ツールPandocを知ろう - Qiita](http://qiita.com/sky_y/items/80bcd0f353ef5b8980ee)
- 日本Pandocユーザ会
    - 最近Slack作りました: [Slack登録フォーム](https://docs.google.com/forms/d/e/1FAIpQLScdXINuMSFlKFk9YClkDUtvZNaYFWVSiJyleYjtMVbIHqwJhA/viewform)

----

# Pandoc公式サイト

- [Pandoc - About pandoc](http://pandoc.org/index.html)
- ユーザーズガイド
    - [Pandoc - Pandoc User’s Guide](http://pandoc.org/MANUAL.html)
    - [Pandoc ユーザーズガイド 日本語版](http://sky-y.github.io/site-pandoc-jp/users-guide/)

----

# いきなりですが質問です

----

# Q1: 普段はどんなファイルやドキュメントを扱っていますか？

- HTML
- LaTeX (数式の入ったドキュメント)
- XML系のドキュメント
- プログラミング言語のドキュメント機能
    - Javadoc, Python docstringなど
- Microsoft Office
    - Word, Excel, PowerPoint
- LibreOffice (Apache OpenOffice)

----

# Q1: 普段はどんなファイルやドキュメントを扱っていますか？

- 軽量マークアップ言語
    - Markdown
    - reStructuredText (Sphinx)
    - Emacs org-mode
    - Wiki記法
        - MediaWiki (Wikipedia)

----

# Q2: どのような目的でドキュメントを扱っていますか？

- Webへの公開（CMS・ブログ・Wiki含む）
- 組織内の情報共有
    - 社内Wiki
    - プロジェクト管理（ガントチャート・UMLも含む）
- 組織外との情報共有・コミュニケーション
- 自分で読み返すためのメモ

----

# この発表の概要

- 質問
- Pandocの概要
- Pandocをインストールする
- Pandocの基本的な使い方
    - Markdown ↔ LibreOffice Writer を例に
- Pandocレシピ集
- Pandocの高度な使い方（ごく簡潔に）
- まとめ・お知らせ

----

# この発表で**やらないこと**

- プログラミング言語のドキュメント機能
    - Pandoc自体はHaskell用ドキュメンテーションに対応
        - [Haddock](https://www.haskell.org/haddock/), [Literate Haskell](https://wiki.haskell.org/Literate_programming)
    - Pandocとの組み合わせができる場合もある
- 表形式のドキュメント（Excel, CSVなど）
    - 現状のPandocが扱える文書モデルから離れるので

----

# Pandocの概要

----

# こんなことに困っていませんか？

- MS Word/LibreOffice Writer
    - 重いのでテキストファイルで下書きしたい
    - バージョン管理をしたいけど、Word文書はGit管理が面倒
- オフィスの共有サーバにある大量の文書（Word, LaTeXなど）を別の書式（HTMLなど）に変換したい
- MediaWiki記法で書いた原稿をSphinx(reST)で使いたい
- Markdownでスライドショーを作りたい
- Markdownで電子書籍(EPUB)を作りたい

----

# Pandocの魅力

----

# Pandocとは

- [Pandoc - About pandoc](http://pandoc.org/index.html)
- 文書変換ツール
    - あるフォーマットで書かれた文書を、別のフォーマットに変換するツール
- Pandocの特徴は、対応フォーマットが非常に多いこと

----

[![](figure/pandoc_diagram.jpg){ width=15% }](http://pandoc.org/diagram.jpg)

----

# 対応フォーマット（一部省略）

- 入力
    -  **Markdown** (Pandoc, CommonMark, PHP Markdown Extra, GitHub-Flavored Markdown, MultiMarkdown)
    - (subsets of) Textile, **reStructuredText, HTML, LaTeX, MediaWiki markup**, Emacs Org mode
    - OPML, DocBook, EPUB, **ODT** and Word docx
- 出力
    - 入力フォーマットのほとんど（ODT含む）
    - **Markdown**
    - manページ,  AsciiDoc, InDesign ICML
    - **プレゼンテーション**: LaTeX Beamer, HTML5(reveal.jsなど)
    - PDF (wkhtmltopdfまたはLaTeXエンジンが必要)

----

# そもそもMarkdownって何？

- このスライド自体が、実はMarkdownで書かれています
- 元々は[John Gruberが作ったオリジナルの処理系](http://daringfireball.net/) でHTMLに変換するための略記法だった
- そのうちGitHubやPHPなどで記法が拡張された
    - MultiMarkdownやPandocの登場をきっかけに、目的も「論文」「プレゼンテーション」「電子書籍」など用途が広がった
    - 数々の「方言」がある状態
- 基本のMarkdownだけを覚えれば、大抵は書けます
    - プレビューを行うのが鉄則

----

# Pandocでできないこと

- 表主体の文書を扱うこと
    - Excel, LibreOffice Calc
    - 一部に簡単な表を埋め込むことはできる（HTMLの`<table>`相当）
- LibreOffice Impressに/を変換すること
    - LaTeX Beamer/HTMLプレゼンには変換可能

----

# Pandocを使う心得

- 過剰な期待をし過ぎないこと
    - Pandocは万能でないし、文書仕様の全てを満たしているわけではない
- 補助的に使うのがベスト
    - Pandocで、テキストと大まかな構造を抽出
    - 変換し切れなかった部分を、手作業や自作スクリプトで編集

----

# Pandocの実装

- 言語: Haskell
    - Pandoc的には、「厳密に型が定義されている」ことがありがたい
    - Haskellは構文解析器(パーサ)を作るのにすごく適している (Parsecなど)
- モジュール構成
    - Reader: 入力文書を解析し、Haskell上の中間文書に変換する
    - Writer: 中間文書を受け取り、出力フォーマットに変換する

----

![Pandocの処理フロー](figure/pandoc_block.jpg)

----

# Pandocが扱えるMarkdown方言

- [Pandoc's Markdown](http://pandoc.org/MANUAL.html#pandocs-markdown): `-f markdown`
    - Pandocにおける標準のMarkdown方言
    - 技術文書から論文・電子書籍まで幅広く対応
- GitHub Flavored Markdown (gfm): `-f markdown_github`
    - GitHubの標準、プログラマ・フレンドリーな方言
- PHP Markdown Extra: `-f markdown_phpextra`
    - 最近はMarkdown Extraとも呼ばれる
- MultiMarkdown: `-f markdown_mmd`
    - HTMLだけでなくLaTeXなどの論文も意図した処理系
- CommonMark: `-f commonmark`
    - 仕様の曖昧さをなくすことを目的とした仕様/処理系
    - ここ最近は、事実上の標準に近づく（公式な標準ではない）

----

# Pandoc's Markdownの特徴

- 詳しくは [Pandoc's Markdown](http://pandoc.org/MANUAL.html#pandocs-markdown) を参照
    - または [Pandoc ユーザーズガイド 日本語版](http://sky-y.github.io/site-pandoc-jp/users-guide/#pandocs-markdown) を参照
- HTMLの定義リスト(`<dl>`, `<dt>`, `<dd>`)がある
- 表(`<table>`)は4種類ある
    - 日本語には「Grid Table」か「Pipe Table」がおすすめ
- **ヘッダ部分にメタデータを記述できる（重要）**
    - タイトルブロック（行を`%`で始める）
        - タイトル（1行目）、著者（2行目）、日付（3行目）のみ簡潔に書ける
    - YAMLメタデータブロック（次のスライド）

----

# YAMLメタデータブロック

- ブロックを`---`で始めて`...`で閉じる
- 改行などの書き方は、YAMLの文法に従う
    - 参考: [Rubyist Magazine - プログラマーのための YAML 入門 (初級編)](http://magazine.rubyist.net/?0009-YAML)
- このブロックで定義されたデータは、メタデータという種類の変数となる
    - `-M`オプションで定義できるものと同じ
    - `-V`オプションで定義できるもの（テンプレート変数）とほとんど同じ（微妙に違う）
    - メタデータは文書変換する際のオプションや制御に使うことができる
        - `pandoc -D (出力書式の名前)`で、実際の使われ方がわかる
    - このブロックを使えば、文書自体にmetadata変数を埋めこめる（便利）

----

# YAMLメタデータブロックの例

```
---
title: Pandoc入門：MarkdownからHTML・PDF・Writer/Word文書・スライドを生成する
author: 藤原 由来
date: 2017年8月4日
revealjs-url: reveal.js-3.4.0
theme: sky-sky-y
transition: fade
transitionSpeed: fast
slideNumber: true
history: false
margin: 0
...
```

----

# 補足: Markdownと標準仕様

- RFC
    - [RFC 7763 - The text/markdown Media Type](https://tools.ietf.org/html/rfc7763)
    - [RFC 7764 - Guidance on Markdown: Design Philosophies, Stability Strategies, and Select Registrations](https://tools.ietf.org/html/rfc7764)
- RFCでも方言は統一できなかった
    - 代わりに、Media Typeにて「Markdownであること」と「方言の名前」を明示する方法を定めた
    - 参考: <http://tk0miya.hatenablog.com/entry/2016/12/30/205418>

----

# Pandocをインストールする

----

# ターミナルを開く

- Mac: ターミナル.app or iTerm2
- Windows: (今回は)コマンドプロンプト
    - (分かっている方は)お好きなターミナルでも結構です
- Linux: お好きなターミナル

----

# Pandocのインストール: パッケージマネージャ編

- 原則として、Haskell処理系は不要です
- Mac([Homebrew](http://brew.sh/index_ja.html))
    - `$ brew install pandoc`
- Windows([Chocolatey](https://chocolatey.org/))
    - `> cinst -y pandoc`
- Linux
    - バージョンが古いことがあるので注意
    - Debian: `$ sudo apt-get install pandoc`
    - CentOS: [pandocをCentOS7にインストール - Qiita](http://qiita.com/fk_2000/items/2ea57ea36b523c0cae5a) を参照
    - ソースコード: [Stack](https://docs.haskellstack.org/en/stable/README/)(Haskellビルドツール)が必要
        - [GitHub - jgm/pandoc: Universal markup converter](https://github.com/jgm/pandoc)

----

# Pandocのインストール: インストーラ編

- パッケージを直接落としてインストール
    1. [ここからパッケージをダウンロード](https://github.com/jgm/pandoc/releases/latest)
        - Windows: `.msi`, Mac: `.pkg`
    2. インストール

----

# wkhtmltopdfのインストール

- PDF出力のために必要
    - TeXLive/MacTeXを入れていれば、LaTeX処理系も利用可能（説明略）
    - ただし、pLaTeXはNGなので、LuaLaTeX/XeLaTeXのみ 
- パッケージマネージャでインストール
    - Mac: `$ brew cask install wkhtmltopdf`
        - Caskの方なので注意
    - Windows: `> cinst -y wkhtmltopdf`
    - Debian: `$ sudo apt-get install wkhtmltopdf`
- パッケージを直接落としてインストール
    1. [wkhtmltopdf - Downloads](http://wkhtmltopdf.org/downloads.html)からダウンロード
    2. インストール


----

# 動作確認: Pandoc単体

Bashにて確認（コマンドプロンプトも同様のはず）

```
$ pandoc --version
$ pandoc --list-input-formats
$ pandoc --list-output-formats
$ echo "**Hello**" | pandoc -f markdown -t html
<p><strong>Hello</strong></p>
```

----

# 動作確認: Pandoc + wkhtmltopdf (PDF)

```
$ echo "**Hello**" | pandoc -f markdown -t html5 -o hello.pdf
```

- `-f`: 入力フォーマット名
- `-t`: 出力フォーマット名
- `-o`: 出力ファイル名
- 入力ファイル名が指定されていない場合は、標準入力を使用

----


# Pandocの基本的な使い方

----

# これからやること

- Markdown ↔ LibreOffice Writer の相互変換を例にします
    - 他の書式に変換するときの基礎になります
    - MS Wordを扱うときは、ほぼ同じです

----

# これからやること

- Markdown文書からWriter文書に変換する
    - とりあえず変換してみる
    - 綺麗なWriter文書を生成する: テンプレート機能
- Writer文書をMarkdownに変換する
- 以下の作業では、[GitHubリポジトリ](https://github.com/sky-y/libreoffice-kansai-14-pandoc)のsampleディレクトリにあるファイルを使います
    - 興味のある人はgit cloneして試してみてください

----

# とりあえず変換してみる: pandocコマンド

```
$ pandoc connpass.md -o connpass.odt
```

- `-o`: 出力ファイル名
    - 多くの場合拡張子で判断できる

----

# ファイルを開く

```
$ open connpass.odt    # Mac/Linux
> start connpass.odt   # Windows
```

----

# 綺麗なWriter文書を生成する

- Pandocのテンプレート機能を使う
    - (1) Pandocコマンドからテンプレートを生成
    - (2) テンプレートをWriterで編集する
    - (3) Pandocの変換時にテンプレートをオプションで指定する
        - もしくはユーザデータディレクトリに入れる

----

# (1) Pandocコマンドからテンプレートを生成

```
$ pandoc --print-default-data-file reference.odt > reference.odt
```

- コマンドオプションで指定する場合は「reference.odt」という名前でなくてよい
- ユーザデータディレクトリ(後述)に入れる場合は必ず「reference.odt」という名前にする

----

# (2) テンプレートをWriterで編集する

- reference.odtを開く
- 内容はPandocから参照されない
    - デフォルトで「Hello World!」と表示されている
    - 例えば表示用サンプルを置いてもいい
- 「スタイルと書式設定」から書式を変更

![](figure/style-and-format.png){ width=50% }

----

# (3) Pandocの変換時にテンプレートをオプションで指定する

```
$ pandoc connpass.md --reference-doc=reference.odt -o connpass2.odt
```

- `--reference-doc`: Writer(やWordなど)のテンプレートを指定 (v2.0)
    - 注意: 以前は `--reference-odt` というオプションだった

----

# 補足：テンプレートをユーザデータディレクトリに入れる

- ユーザデータディレクトリの場所: `pandoc -v` で出る
    - Windows: `C:\Users\ユーザ名\AppData\Roaming\pandoc`
    - Mac: `$HOME/.pandoc`
- このディレクトリに「reference.odt」という名前でテンプレートを入れると、次回からデフォルトで使ってくれる

----

# PandocとWriterの具体的なノウハウ (nogajunさん)

- [PandocとLibreOffice WriterでiDエディタのマニュアルを製本する, どうしてこうなった - Days of Speed(2014-12-06)](http://www.nofuture.tv/diary/20141206.html)
    - [nogajun/pandoc-writer](https://github.com/nogajun/pandoc-writer)の`pandoc-writer.odt`がテンプレートとして使える

```
$ pandoc connpass.md --reference-doc=pandoc-writer.odt -o connpass-pandoc-writer.odt
```

----

# 画像に関するノウハウ (いくやさん)

- [PandocでMarkdownをODTに変換する - いくやの斬鉄日記](http://blog.goo.ne.jp/ikunya/e/826e6916307159c87afde0fe23c5e1e4)
    - 画像のサイズを整える (ImageMagickの`mogrify`コマンド)
    - 画像のDPIを変更する (同上)

----

# Writer文書からMarkdown/reST/LaTeX文書に変換してみる

- nogajunさんの`pandoc-writer.odt`を変換してみる
- Markdown (Pandoc's)
    - `$ pandoc pandoc-writer.odt -o pandoc-writer.md`
- reStructuredText (Sphinxなどで使用)
    - `$ pandoc pandoc-writer.odt -o pandoc-writer.rst`
- LaTeX
    - デフォルトはLuaLaTeX/XeLaTeXが必要なので注意
    - 詳細: [BXjscls がまた新しくなった（v1.1a） - マクロツイーター](http://d.hatena.ne.jp/zrbabbler/20160228/1456622107)
    - `$ pandoc -s pandoc-writer.odt -o pandoc-writer.tex`
    - `-s`: 文書として完全になるようにヘッダ・フッタを付ける (standaloneモード)

----

# Q&A

## (特にPandocコマンドについて)

----

# Pandocレシピ集

----

- MS Word/LibreOffice Writer
    - 重いのでテキストファイルで下書きしたい
    - バージョン管理をしたいけど、Word文書はGit管理が面倒
- オフィスの共有サーバにある大量の文書（Word, LaTeXなど）を別の書式（HTMLなど）に変換したい
- MediaWiki記法で書いた原稿をSphinx(reST)で使いたい
- Markdownでスライドショーを作りたい
- 電子書籍を作りたい

----

# Markdownでスライドショーを作りたい

- このスライド自体をPandocで生成しました
- 今回は「reveal.js」形式に変換
    - HTML+JavaScriptによるプレゼンテーション
    - クライアントサイドで完結→GitHub Pagesにアップロード可能
- 補足: Pandocでは他のプレゼン形式にも変換できる
    - LaTeX Beamer
    - reveal.js以外のHTMLプレゼン（割愛）

----

# 実際のソースコード

- このスライド自体がGitHub Pagesにアップロードされています
- [GitHubリポジトリ](https://github.com/sky-y/libreoffice-kansai-14-pandoc) 
    - [ソース (Pandoc's Markdown)](https://raw.githubusercontent.com/sky-y/libreoffice-kansai-14-pandoc/master/index.p.md)
    - [復習用資料 (GitHub Flavored Markdown)](https://github.com/sky-y/libreoffice-kansai-14-pandoc/blob/master/index_github.md)
    - [発表用スライド (HTML/reveal.js)](https://sky-y.github.io/libreoffice-kansai-14-pandoc/)

----

# まとめ・お知らせ

----

# 今日やったこと

- ここに書く

----

# Pandocの今後の課題

- 日本語に特化した文書フォーマットにほとんど対応していない
    - 書籍におけるルビや圏点など
    - 日本語コミュニティの必要性
- 表形式の文書は対応していない
    - Excel文書など→Excel方眼紙への対策には致命的
    - サードパーティのプリプロセッサにより部分的に変換する手段はある
        - 一部の図表（Graphvizなど）はこの方法で取り込むことができる

----

# 日本Pandocユーザ会

- Webサイトはリニューアル予定
- Slackを始めました
    - [Slack登録フォーム](https://docs.google.com/forms/d/e/1FAIpQLScdXINuMSFlKFk9YClkDUtvZNaYFWVSiJyleYjtMVbIHqwJhA/viewform)

----

# ドキュメンテーションWiki

- [ドキュメンテーションWiki (GitHub)](https://github.com/doc-wiki-jp/wiki/wiki)
- 誰でも編集歓迎します（要GitHubアカウント）
- 特にLibreOffice関連の記事が不足しています

----

# Q&A

- 連絡先
    - <sky.y.0079@gmail.com>
    - Twitter: [@sky_y](https://twitter.com/sky_y)