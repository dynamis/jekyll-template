---
note: <body> 末尾で読み込むサイト共通のスクリプト。ライブラリおよびサイト固有のスクリプト。
---
{% if site.js.minified %}
{% if site.js.jquery %}{% include jslib/jquery-1.9.1.min.js %}{% endif %}
{% if site.js.bootstrap %}{% include jslib/bootstrap.min.js %}{% endif %}
{% include js/main.min.js %}
{% else %}
{% if site.js.jquery %}{% include jslib/jquery-1.9.1.js %}{% endif %}
{% if site.js.bootstrap %}{% include jslib/bootstrap.js %}{% endif %}
{% include js/main.js %}
{% endif %}