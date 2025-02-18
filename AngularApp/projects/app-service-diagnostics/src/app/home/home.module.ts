import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { SharedV2Module } from '../shared-v2/shared-v2.module';
import { HomeComponent } from './components/home/home.component';
import { CategoryChatComponent } from './components/category-chat/category-chat.component';
import { CategoryTileComponent } from './components/category-tile/category-tile.component';
import { CategoryTabResolver, CategoryChatResolver } from './resolvers/category-tab.resolver';
import { SupportBotModule } from '../supportbot/supportbot.module';
import { SearchResultsComponent } from './components/search-results/search-results.component';
import { FormsModule } from '@angular/forms';
import { GenericDetectorComponent } from '../shared/components/generic-detector/generic-detector.component';
import { TabTitleResolver } from '../shared/resolvers/tab-name.resolver';
import { SupportTopicRedirectComponent } from './components/support-topic-redirect/support-topic-redirect.component';
import { TimeControlResolver } from './resolvers/time-control.resolver';
import { ContentService } from '../shared-v2/services/content.service';
import { DiagnosticDataModule } from 'diagnostic-data';
import { GenericAnalysisComponent } from '../shared/components/generic-analysis/generic-analysis.component';
import { DiagnosticsSettingsComponent } from './components/diagnostics-settings/diagnostics-settings.component';

export const HomeRoutes = RouterModule.forChild([
  {
    path: '',
    component: HomeComponent,
    data: {
      navigationTitle: 'Home',
      cacheComponent: true
    },
  },
  {
    path: 'categories/:category',
    component: CategoryChatComponent,
    data: {
      cacheComponent: true
    },
    resolve: {
      navigationTitle: CategoryTabResolver,
      messageList: CategoryChatResolver
    }
  },
  {
    path: 'detectors/:detectorName',
    component: GenericDetectorComponent,
    data: {
      cacheComponent: true
    },
    resolve: {
      time: TimeControlResolver,
      navigationTitle: TabTitleResolver,
    }
  },
  {
    path: 'analysis/:analysisId/detectors/:detectorName',
    component: GenericAnalysisComponent,
    data: {
      cacheComponent: true
    },
    children: [
      {
        path: '',
        component: GenericDetectorComponent,
        data: {
          analysisMode: true,
          cacheComponent: true
        }
      }
    ],
    resolve: {
      time: TimeControlResolver,
      navigationTitle: TabTitleResolver,
    }
  },
  {
    path: 'analysis/:analysisId',
    component: GenericAnalysisComponent,
    data: {
      cacheComponent: true
    },
    children: [
      {
        path: '',
        component: GenericDetectorComponent,
        data: {
          analysisMode: true,
          cacheComponent: true
        }
      }
    ],
    resolve: {
      time: TimeControlResolver,
      navigationTitle: TabTitleResolver,
    }
  },
  {
    path: 'analysis/:analysisId/detectors',
    component: GenericAnalysisComponent,
    data: {
      cacheComponent: true
    },
    children: [
      {
        path: '',
        component: GenericDetectorComponent,
        data: {
          analysisMode: true,
          cacheComponent: true
        }
      }
    ],
    resolve: {
      time: TimeControlResolver,
      navigationTitle: TabTitleResolver,
    }
  },
  {
    path: 'supportTopicId',
    component: SupportTopicRedirectComponent
  },
  {
    path: 'settings',
    component: DiagnosticsSettingsComponent,
    data: {
      navigationTitle: 'App Service Diagnostics Settings'
    }
  },
]);

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    DiagnosticDataModule,
    HomeRoutes,
    SupportBotModule,
    FormsModule
  ],
  declarations: [HomeComponent, CategoryChatComponent, CategoryTileComponent, SearchResultsComponent, SupportTopicRedirectComponent, DiagnosticsSettingsComponent],
  providers: [CategoryTabResolver, CategoryChatResolver, TimeControlResolver]
})
export class HomeModule { }
