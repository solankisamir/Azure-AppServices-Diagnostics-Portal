import { NgModule, Injectable } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DashboardComponent, FormatResourceNamePipe } from './dashboard/dashboard.component';
import { SharedModule } from '../../shared/shared.module';
import { ModuleWithProviders } from '@angular/compiler/src/core';
import { RouterModule, Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AngularSplitModule } from 'angular-split-ng6';
import { MonacoEditorModule } from 'ngx-monaco-editor';
import { NgxSmartModalModule } from 'ngx-smart-modal';
import { MarkdownModule } from 'ngx-markdown';
import { StartupService } from '../../shared/services/startup.service';
import { Observable } from 'rxjs';
import { SideNavComponent, SearchMenuPipe } from './side-nav/side-nav.component';
import { ResourceMenuItemComponent } from './resource-menu-item/resource-menu-item.component';
import { ResourceService } from '../../shared/services/resource.service';
import { ResourceServiceFactory } from '../../shared/providers/resource.service.provider';
import { ResourceHomeComponent } from './resource-home/resource-home.component';
import { OnboardingFlowComponent } from './onboarding-flow/onboarding-flow.component';
import { TabCommonComponent } from './tabs/tab-common/tab-common.component';
import { TabDataComponent } from './tabs/tab-data/tab-data.component';
import { TabDevelopComponent } from './tabs/tab-develop/tab-develop.component';
import { ApplensDiagnosticService } from './services/applens-diagnostic.service';
import { ApplensCommsService } from './services/applens-comms.service';
import { ApplensSupportTopicService } from './services/applens-support-topic.service';
import { DiagnosticService, DiagnosticDataModule, CommsService, DetectorControlService } from 'diagnostic-data';
import { CollapsibleMenuModule } from '../../collapsible-menu/collapsible-menu.module';
import { ObserverService } from '../../shared/services/observer.service';
import { TabDataSourcesComponent } from './tabs/tab-data-sources/tab-data-sources.component';
import { TabMonitoringComponent } from './tabs/tab-monitoring/tab-monitoring.component';
import { TabMonitoringDevelopComponent } from './tabs/tab-monitoring-develop/tab-monitoring-develop.component';
import { TabAnalyticsDevelopComponent } from './tabs/tab-analytics-develop/tab-analytics-develop.component';
import { TabAnalyticsDashboardComponent } from './tabs/tab-analytics-dashboard/tab-analytics-dashboard.component';
import { DiagnosticSiteService } from 'diagnostic-data';
import { SolutionService } from 'diagnostic-data';
import { GenericSolutionService } from '../../shared/services/generic-solution.service';
import { GistComponent } from './gist/gist.component';
import { TabGistCommonComponent } from './tabs/tab-gist-common/tab-gist-common.component';
import { TabGistDevelopComponent } from './tabs/tab-gist-develop/tab-gist-develop.component';
import { TabChangelistComponent } from './tabs/tab-changelist/tab-changelist.component';
import { GistChangelistComponent } from './gist-changelist/gist-changelist.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { TabAnalysisComponent } from './tabs/tab-analysis/tab-analysis.component';
import { CategoryPageComponent } from './category-page/category-page.component';
import { AvatarModule } from 'ngx-avatar';
import { SupportTopicPageComponent } from './support-topic-page/support-topic-page.component';
import { SelfHelpContentComponent } from './self-help-content/self-help-content.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { SearchTermAdditionComponent } from './search-term-addition/search-term-addition.component';
import { SearchResultsComponent } from './search-results/search-results.component';
import { Sort } from '../../shared/pipes/sort.pipe';
import { SearchService } from './services/search.service';

@Injectable()
export class InitResolver implements Resolve<Observable<boolean>>{
    constructor(private _resourceService: ResourceService, private _detectorControlService: DetectorControlService) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        this._detectorControlService.setCustomStartEnd(route.queryParams['startTime'], route.queryParams['endTime']);
        return this._resourceService.waitForInitialization();
    }
}

export const DashboardModuleRoutes: ModuleWithProviders = RouterModule.forChild([
    {
        path: '',
        component: DashboardComponent,
        resolve: { info: InitResolver },
        children: [
            {
                path: '',
                redirectTo: 'home/category'
            },
            {
                path: 'home/:viewType',
                component: ResourceHomeComponent,
                pathMatch: 'full'
            },
            {
                path: 'users/:userId',
                component: UserProfileComponent,
            },
            {
                path: 'categories/:category',
                component: CategoryPageComponent,
            },
            {
                path: 'supportTopics/:supportTopic',
                component: SupportTopicPageComponent,
            },
            {
                path: 'pesId/:pesId/supportTopics/:supportTopicId',
                component: SelfHelpContentComponent,
            },
            {
                path: 'create',
                component: OnboardingFlowComponent
            },
            {
                path: 'createGist',
                component: GistComponent
            },
            {
                path: 'gists/:gist',
                component: TabGistCommonComponent,
                children: [
                    {
                        path: '',
                        component: TabGistDevelopComponent,
                    }, {
                        path: 'edit',
                        redirectTo: ''
                    }, {
                        path: 'changelist',
                        component: TabChangelistComponent
                    }, {
                        path: 'changelist/:sha',
                        component: TabChangelistComponent
                    }
                ]
            },
            {
                path: 'detectors/:detector',
                component: TabCommonComponent,
                children: [
                    {
                        path: '',
                        component: TabDataComponent
                    },
                    {
                        path: 'data',
                        redirectTo: ''
                    },
                    {
                        path: 'edit',
                        component: TabDevelopComponent
                    }, {
                        path: 'changelist',
                        component: TabChangelistComponent
                    },
                    {
                        path: 'datasource',
                        component: TabDataSourcesComponent
                    },
                    {
                        path: 'monitoring',
                        component: TabMonitoringComponent
                    },
                    {
                        path: 'analytics',
                        component: TabAnalyticsDashboardComponent
                    },
                    {
                        path: 'monitoring/edit',
                        component: TabMonitoringDevelopComponent
                    },
                    {
                        path: 'analytics/edit',
                        component: TabAnalyticsDevelopComponent
                    }
                ]
            },
            {
                path: 'analysis/:analysisId/detectors/:detector',
                component: TabAnalysisComponent,
                children: [
                    {
                        path: '',
                        component: TabDataComponent,
                        data: {
                            analysisMode: true
                        }
                    },
                    {
                        path: 'data',
                        redirectTo: ''
                    },
                    {
                        path: 'datasource',
                        component: TabDataSourcesComponent
                    }
                ]
            },
            {
                path: 'analysis/:analysisId',
                component: TabAnalysisComponent,
                children: [
                    {
                        path: '',
                        component: TabDataComponent
                    },
                    {
                        path: 'data',
                        redirectTo: ''
                    },
                    {
                        path: 'datasource',
                        component: TabDataSourcesComponent
                    }
                ]
            },
            {
                path: 'analysis/:analysisId/detectors',
                component: TabAnalysisComponent,
                children: [
                    {
                        path: '',
                        component: TabDataComponent
                    },
                    {
                        path: 'data',
                        redirectTo: ''
                    },
                    {
                        path: 'datasource',
                        component: TabDataSourcesComponent
                    }
                ]
            },
            {
              path: 'search',
              component: SearchResultsComponent
            }
        ]
    },

]);

@NgModule({
    imports: [
        AvatarModule,
        CommonModule,
        FormsModule,
        DashboardModuleRoutes,
        DiagnosticDataModule,
        SharedModule,
        MonacoEditorModule.forRoot(),
        AngularSplitModule,
        CollapsibleMenuModule,
        NgxSmartModalModule.forRoot(),
        NgSelectModule,
        MarkdownModule.forRoot()
    ],
    providers: [
        ApplensDiagnosticService,
        SearchService,
        ApplensCommsService,
        ApplensSupportTopicService,
        InitResolver,
        {
            provide: ResourceService,
            useFactory: ResourceServiceFactory,
            deps: [StartupService, ObserverService]
        },
        { provide: DiagnosticService, useExisting: ApplensDiagnosticService },
        { provide: CommsService, useExisting: ApplensCommsService },
        { provide: DiagnosticSiteService, useExisting: ResourceService },
        { provide: SolutionService, useExisting: GenericSolutionService }
    ],
    declarations: [DashboardComponent, SideNavComponent, ResourceMenuItemComponent, ResourceHomeComponent, OnboardingFlowComponent, SearchTermAdditionComponent,
        SearchMenuPipe, TabDataComponent, TabDevelopComponent, TabCommonComponent, TabDataSourcesComponent, TabMonitoringComponent,
        TabMonitoringDevelopComponent, TabAnalyticsDevelopComponent, TabAnalyticsDashboardComponent, GistComponent, TabGistCommonComponent,
        TabGistDevelopComponent, TabChangelistComponent, GistChangelistComponent, TabAnalysisComponent, CategoryPageComponent, SupportTopicPageComponent,
        SelfHelpContentComponent, UserProfileComponent, FormatResourceNamePipe, Sort, SearchResultsComponent]
})
export class DashboardModule { }
