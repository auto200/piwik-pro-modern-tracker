# Alternative client for tracking interactions with Piwik PRO

## Why?

current tracking library is a legacy inherited from [matomo](https://github.com/matomo-org/matomo) project, the aim is to create more modern version and learn along the way.

## Objectives

recreate a solution allowing for using (some of?) the features that [current client](https://developers.piwik.pro/en/latest/data_collection/web/javascript_tracking_client/api.html) offers. The Core of the project is a HTTP client for communicating with the [Tracer web api](https://developers.piwik.pro/en/latest/data_collection/api/http_api.html)

## Current approach

Use reasonably modern features of the browser and javascript, backwards compatibility (IE11) should be taken care of as a last step. In case of a missing crucial feature of the browser like a `IntersectionObserver` we should reach for the polyfill instead of tinkering our own solution or workarounds
_this may change at any point in time_
