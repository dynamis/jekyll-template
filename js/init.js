---
note: <head> 部で読み込む JS を連結出力する。
---
{% if site.js.minified %}
{% if site.js.modernizr %}{% include jslib/modernizr-2.6.2.min.js %}{% endif %}
{% if site.js.respond %}{% include jslib/respond-1.1.0.min.js %}{% endif %}
{% else %}
{% if site.js.modernizr %}{% include jslib/modernizr-2.6.2.js %}{% endif %}
{% if site.js.respond %}{% include jslib/respond-1.1.0.js %}{% endif %}
{% endif %}