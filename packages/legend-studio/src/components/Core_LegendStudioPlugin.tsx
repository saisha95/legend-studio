/**
 * Copyright (c) 2020-present, Goldman Sachs
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import {
  collectKeyedContextualDocumentationEntriesFromConfig,
  collectKeyedDocumnetationEntriesFromConfig,
  type LegendApplicationKeyedContextualDocumentationEntry,
  type LegendApplicationKeyedDocumentationEntry,
} from '@finos/legend-application';
import packageJson from '../../package.json';
import {
  CORE_CONTEXTUAL_DOCUMENTATION_ENTRIES,
  CORE_DOCUMENTATION_ENTRIES,
} from '../stores/LegendStudioDocumentation.js';
import { LegendStudioPlugin } from '../stores/LegendStudioPlugin.js';

export class Core_LegendStudioPlugin extends LegendStudioPlugin {
  static NAME = packageJson.extensions.core_studioPlugin;

  constructor() {
    super(Core_LegendStudioPlugin.NAME, packageJson.version);
  }

  override getExtraKeyedDocumentationEntries(): LegendApplicationKeyedDocumentationEntry[] {
    return collectKeyedDocumnetationEntriesFromConfig(
      CORE_DOCUMENTATION_ENTRIES,
    );
  }

  override getExtraKeyedContextualDocumentationEntries(): LegendApplicationKeyedContextualDocumentationEntry[] {
    return collectKeyedContextualDocumentationEntriesFromConfig(
      CORE_CONTEXTUAL_DOCUMENTATION_ENTRIES,
    );
  }
}
