# NgDraw

Angular learning project generated with [Angular CLI](https://github.com/angular/angular-cli) version 11.0.4.

Deployed here: https://ng-draw.vercel.app/


# Conclusions / Lessons / Questions

- Singleton services should not depend on one another; this is a single-responsibility principle code smell. Methods which depend on multiple singleton services should probably live in component-scoped services if not components themselves (the latter is what I've done here). I went some ways down a bad path here and had to do a costly refactor to get out of it.
- Immutable data strucures could be a way around the awkward way the observable state is used here--we'd rely on the change-detection system rather than the observable for the scene state--but I'm trying to pick up the observables way of doing things. I suspect the observable-architecture way to go here would be to have the subscription to the scene array flatMap/mergeMap in shape subscriptions such that shape property changes trigger canvas redraws automatically?
- Did my own color picker to experiment with modals, ng-content, layout components. Far from confident that the pattern I'm using makes sense.
