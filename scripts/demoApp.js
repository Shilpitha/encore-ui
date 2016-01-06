function genericRouteController (breadcrumbs) {
    return function (rxBreadcrumbsSvc, Environment, $interpolate) {
        if (breadcrumbs === undefined) {
            breadcrumbs = [{
                name: '',
                path: ''
            }]
        }

        breadcrumbs.forEach(function (breadcrumb) {
            if (breadcrumb.path) {
                breadcrumb.path = $interpolate(Environment.get().url)({ path: breadcrumb.path });
            }
        });

        rxBreadcrumbsSvc.set(breadcrumbs);
    }
}

angular.module('demoApp', ['encore.ui', 'ngRoute'])
.config(function ($routeProvider, rxStatusTagsProvider) {
    $routeProvider
        .when('/', {
            redirectTo: '/overview'
        })
        .when('/login', {
            templateUrl: 'templates/login.html',
            controller: genericRouteController()
        })
        .when('/overview', {
            templateUrl: 'templates/overview.html',
            controller: genericRouteController()
        })

        /* Layout */
        .when('/layout/collapsible', {
            templateUrl: 'templates/layout/collapsible.html',
            controller: genericRouteController([
                { name: 'Collapsible' }
            ])
        })
        .when('/layout/grid', {
            templateUrl: 'templates/layout/grid.html',
            controller: genericRouteController([
                { name: 'Flexbox Grid' }
            ])
        })
        .when('/layout/grid-1-0', {
            templateUrl: 'templates/layout/grid-1-0.html',
            controller: genericRouteController([
                { name: 'Pure CSS Grid' }
            ])
        })
        .when('/layout/modals', {
            templateUrl: 'templates/layout/modals.html',
            controller: genericRouteController([
                { name: 'Modals' }
            ])
        })
        .when('/layout/page/detail', {
            templateUrl: 'templates/layout/page/detail-page.html',
            controller: genericRouteController([
                { name: 'Detail Page' }
            ])
        })
        .when('/layout/page/data-table', {
            templateUrl: 'templates/layout/page/data-table-page.html',
            controller: genericRouteController([
                { name: 'Data Table' }
            ])
        })
        .when('/layout/page/form', {
            templateUrl: 'templates/layout/page/form-page.html',
            controller: genericRouteController([
                { name: 'Form Page' }
            ])
        })
        .when('/layout/wells', {
            templateUrl: 'templates/layout/wells.html',
            controller: genericRouteController([
                { name: 'Wells' }
            ])
        })

        /* Style Pages */
        .when('/styles/color', {
            templateUrl: 'templates/styles/color.html',
            controller: genericRouteController([
                { name: 'Color' }
            ])
        })
        .when('/styles/color-1-0', {
            templateUrl: 'templates/styles/color-1-0.html',
            controller: genericRouteController([
                { name: 'Color' }
            ])
        })
        .when('/styles/formatting', {
            templateUrl: 'templates/styles/formatting.html',
            controller: genericRouteController([{
                name: 'Formatting'
            }])
        })
        .when('/styles/helper-classes', {
            templateUrl: 'templates/styles/helper-classes.html',
            controller: genericRouteController([
                { name: 'Helper Classes' }
            ])
        })
        .when('/styles/typography', {
            templateUrl: 'templates/styles/typography.html',
            controller: genericRouteController([
                {
                    name: 'Typography'
                }
            ])
        })

        /* Module Pages */
        .when('/modules', {
            templateUrl: 'templates/modules/listModules.html',
            controller: 'listModulesController',
            controllerAs: 'vm'
        })
        .when('/modules/:module', {
            templateUrl: 'templates/modules/showModule.html',
            controller: 'showModuleController',
            resolve: {
                'module': function ($route, Modules) {
                    return _.find(Modules, {
                        'name': $route.current.params.module
                    });
                }
            }
        })

        /* Quark Pages */
        .when('/quarks', {
            templateUrl: 'templates/modules/listCategoryModules.html',
            controller: 'listQuarksController',
            controllerAs: 'vm'
        })
        .when('/quarks/:quark', {
            templateUrl: 'templates/modules/showModule.html',
            controller: 'showModuleController',
            resolve: {
                'module': function ($route, Modules) {
                    return _.find(Modules, {
                        'name': $route.current.params.quark
                    });
                }
            }
        })

        /* Atom Pages */
        .when('/atoms', {
            templateUrl: 'templates/modules/listCategoryModules.html',
            controller: 'listAtomsController',
            controllerAs: 'vm'
        })
        .when('/atoms/buttons', {
            templateUrl: 'templates/atoms/buttons.html',
            controller: genericRouteController([
                { name: 'Buttons' }
            ])
        })
        .when('/atoms/links', {
            templateUrl: 'templates/atoms/links.html',
            controller: genericRouteController([
                { name: 'Links' }
            ])
        })
        .when('/atoms/:atom', {
            templateUrl: 'templates/modules/showModule.html',
            controller: 'showModuleController',
            resolve: {
                'module': function ($route, Modules) {
                    return _.find(Modules, {
                        'name': $route.current.params.atom
                    });
                }
            }
        })

        /* Molecule Pages */
        .when('/molecules', {
            templateUrl: 'templates/modules/listCategoryModules.html',
            controller: 'listMoleculesController',
            controllerAs: 'vm'
        })
        .when('/molecules/forms', { // TODO: merge with rxForm
            templateUrl: 'templates/molecules/forms.html',
            controller: genericRouteController([
                { name: 'Forms' }
            ])
        })
        .when('/molecules/tables', {
            templateUrl: 'templates/molecules/tables.html',
            controller: genericRouteController([
                { name: 'Tables' }
            ])
        })
        .when('/molecules/:molecule', {
            templateUrl: 'templates/modules/showModule.html',
            controller: 'showModuleController',
            resolve: {
                'module': function ($route, Modules) {
                    return _.find(Modules, {
                        'name': $route.current.params.molecule
                    });
                }
            }
        })

        /* Component Pages */
        .when('/components', {
            templateUrl: 'templates/modules/listCategoryModules.html',
            controller: 'listComponentsController',
            controllerAs: 'vm'
        })
        .when('/components/:component', {
            templateUrl: 'templates/modules/showModule.html',
            controller: 'showModuleController',
            resolve: {
                'module': function ($route, Modules) {
                    return _.find(Modules, {
                        'name': $route.current.params.component
                    });
                }
            }
        })

        /* Guide Pages */
        .when('/guides/:guide', {
            controller: 'guideController as vm',
            templateUrl: 'templates/guides/showGuide.html'
        });

    // Define a custom status tag for use in the rxBreadcrumbs demo
    rxStatusTagsProvider.addStatus({
        key: 'demo',
        class: 'alpha-status',
        text: 'Demo Tag'
    });
})
.run(function ($rootScope, $window, $location, $anchorScroll, $interpolate,
               Environment, rxBreadcrumbsSvc, rxPageTitle, Modules) {
    var baseGithubUrl = '//rackerlabs.github.io/encore-ui/';
    Environment.add({
        name: 'ghPages',
        pattern: /\/\/rackerlabs.github.io/,
        url: baseGithubUrl + '{{path}}'
    });

    rxBreadcrumbsSvc.setHome($interpolate(Environment.get().url)({ path: '#/overview' }), 'Overview');

    var linksForModuleCategory = function (kategory) {
        var filteredModules = _.filter(Modules, {
            category: kategory,
            isCategory: false
        });

        var sortedModules = _.sortBy(filteredModules, function (mod) {
            return mod.displayName.toLowerCase();
        });

        return sortedModules.map(function (mod) {
            return {
                href: ['#', kategory, mod.name].join('/'),
                linkText: mod.displayName
            };
        });
    };//linksForModuleCategory()

    $rootScope.demoNav = [
        {
            type: 'no-title',
            children: [
                {
                    linkText: 'Overview',
                    href: '#/overview'
                },
                {
                    linkText: 'Styleguide',
                    children: [
                        {
                            linkText: 'Color',
                            href: '#/styles/color'
                        },
                        {
                            linkText: 'Formatting',
                            href: '#/styles/formatting'
                        },
                        {
                            linkText: 'Helper classes',
                            href: '#/styles/helper-classes'
                        },
                        {
                            linkText: 'Typography',
                            href: '#/styles/typography'
                        }
                    ]
                },
                {
                    linkText: 'All Modules',
                    href: '#/modules'
                },
                {
                    linkText: 'Quarks',
                    children: linksForModuleCategory('quarks')
                },
                {
                    linkText: 'Atoms',
                    children: [
                        {
                            linkText: 'Buttons',
                            href: '#/atoms/buttons'
                        },
                        {
                            linkText: 'Links',
                            href: '#/atoms/links'
                        }
                    ].concat(linksForModuleCategory('atoms'))
                },
                {
                    linkText: 'Molecules',
                    children: [
                        {
                            linkText: 'Forms',
                            href: '#/molecules/forms'
                        },
                        {
                            linkText: 'Tables',
                            href: '#/molecules/tables'
                        }
                    ].concat(linksForModuleCategory('molecules'))
                },
                {
                    linkText: 'Layout',
                    children: [
                        {
                            linkText: 'Collapsible',
                            href: '#/layout/collapsible'
                        },
                        {
                            linkText: 'Flexbox Grid',
                            href: '#/layout/grid'
                        },
                        {
                            linkText: 'Modals',
                            href: '#/layout/modals'
                        },
                        {
                            linkText: 'Page Examples',
                            children: [
                                {
                                    linkText: 'Layout 1: Detail Page',
                                    href: '#/layout/page/detail'
                                },
                                {
                                    linkText: 'Layout 2: Data Table',
                                    href: '#/layout/page/data-table'
                                },
                                {
                                    linkText: 'Layout 3: Form Page',
                                    href: '#/layout/page/form'
                                }
                            ]
                        },
                        {
                            linkText: 'Wells',
                            href: '#/layout/wells'
                        }
                    ]
                },
                {
                    linkText: 'Components',
                    children: linksForModuleCategory('components')
                }
            ]
        }
    ];

    rxPageTitle.setSuffix(' - EncoreUI');

    $rootScope.$on('$routeChangeSuccess', function() {
        if ($location.hash()) {
            $anchorScroll();
        } else {
            $window.scrollTo(0,0);
        }
    });
});
