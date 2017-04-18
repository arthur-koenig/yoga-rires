---
layout: post
blog: true
title: Week-end Créativité, rire et bonheur
description: Super week and etc...
img: img/visuel.jpg
comments: true
date: 2017-04-18 17:12
---


Before we start getting our hands dirty on a concrete prototype, we wanted to take the time to build our collective awareness on what it means to interoperate our platforms. What can be the impact? What can be the technological solutions we could use? So that we can all engage with awareness.

Here is how we formulated the intention for that second session :

“Reach a shared consciousness about the possible solutions to interoperate our platforms and their respective impacts, and start to envision an architecture on how “products” and “orders” data could be described, filled in, shared and accessed.”

The different steps of the data

To simplify daily management of products catalogs for farmers and food hubs, we need platforms to be able to share data. For example, a producer working with various food hubs using different platforms should be able to manage his inventory in one platform and then allow the other hubs to access and display it (or part of it) on their own shop front. What is the life cycle of data and what do we need to do at each stage to be able to share it?

1. Describe.

To enable our platforms to share data that can be used by other platforms, we need to adopt a common vocabulary, a standard. That doesn’t mean that every platform will need to change its terminology. That means “when you talk about a tomato and I talk about a tomato, are we talking about the same tomato?”. The solution would be to define a meta-ontology encompassing all the specific ontologies used by every actor.

2. Fill in.

Data are currently entered in a specific way and format, depending on each platform. No need to make that evolve to ensure interoperability, APIs will make it possible whatever the origin format. It might be interesting however, to consider options to enrich the data through a semantic format. Semantic data makes it easier to connect with external databases (see wikidata / dbpedia) and make the data smarter.

3. Share.

Given the meta-ontology described, every platform can set up an API that will enable to “match” fields used by different platforms and display information from distant databases. This stage has more impact on how platforms and applications are built. The platform will now need to query not only its own database, but also distant databases through the API. Can it be done in a dynamic way? Is a proxy needed to copy the data into the platform database before displaying them?