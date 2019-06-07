/**
  Copyright (c) 2015, 2019, Oracle and/or its affiliates.
  The Universal Permissive License (UPL), Version 1.0
*/
define(['ojs/ojcomposite', 'text!./toolbar-comp-view.html', './toolbar-comp-viewModel', 'text!./component.json', 'css!./toolbar-comp-styles'],
  function(Composite, view, viewModel, metadata) {
    Composite.register('toolbar-comp', {
      view: view,
      viewModel: viewModel,
      metadata: JSON.parse(metadata)
    });
  }
);