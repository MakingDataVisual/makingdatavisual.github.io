---
---

Jekyll test document

{% for group in site.data.figures %}
# {{ group.group }}
{% for figure in group.children %}

{% if figure.number %}
{% if figure.variable %}
## {{ figure.number }}: {{ figure.title}} ({{ figure.variable }})
{% else %}
## {{ figure.number }}: {{ figure.title}}
{% endif %}
{% else %}
## {{ figure.spec }}
{% endif %}

{% assign imgurl = figure.spec | remove:".vl.json" | remove:".vg.json" | append: ".png" | prepend: "img/" %}

![spec]({{ imgurl }})

{{ figure.caption }}

{% if figure.note %}
_Note: {{figure.note}}_
{% endif %}

{% endfor %}
{% endfor %}
