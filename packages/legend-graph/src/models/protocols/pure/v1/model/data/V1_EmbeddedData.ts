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

import { type Hashable, hashArray } from '@finos/legend-shared';
import { CORE_HASH_STRUCTURE } from '../../../../../../MetaModelConst.js';
import { hashObjectWithoutSourceInformation } from '../../../../../../MetaModelUtils.js';
import type { V1_RelationalData } from './V1_RelationalData.js';

export interface V1_EmbeddedDataVisitor<T> {
  visit_EmbeddedData(embeddedData: V1_EmbeddedData): T;
  visit_ExternalFormatData(externalFormatData: V1_ExternalFormatData): T;
  visit_ModelStoreData(modelStoreData: V1_ModelStoreData): T;
  visit_DataElementReference(dataElementReference: V1_DataElementReference): T;
  visit_RelationalData(relationalData: V1_RelationalData): T;
}

export abstract class V1_EmbeddedData implements Hashable {
  abstract get hashCode(): string;

  abstract accept_EmbeddedDataVisitor<T>(visitor: V1_EmbeddedDataVisitor<T>): T;
}
export class V1_DataElementReference
  extends V1_EmbeddedData
  implements Hashable
{
  dataElement!: string;

  get hashCode(): string {
    return hashArray([
      CORE_HASH_STRUCTURE.DATA_ELEMENT_REFERENCE,
      this.dataElement,
    ]);
  }

  accept_EmbeddedDataVisitor<T>(visitor: V1_EmbeddedDataVisitor<T>): T {
    return visitor.visit_DataElementReference(this);
  }
}
export class V1_ExternalFormatData extends V1_EmbeddedData implements Hashable {
  contentType!: string;
  data!: string;

  get hashCode(): string {
    return hashArray([
      CORE_HASH_STRUCTURE.EXTERNAL_FORMAT_DATA,
      this.contentType,
      this.data,
    ]);
  }

  accept_EmbeddedDataVisitor<T>(visitor: V1_EmbeddedDataVisitor<T>): T {
    return visitor.visit_ExternalFormatData(this);
  }
}

export class V1_ModelStoreData extends V1_EmbeddedData implements Hashable {
  instances!: Map<string, object>;

  get hashCode(): string {
    return hashArray([
      CORE_HASH_STRUCTURE.MODEL_STORE_DATA,
      hashArray(Array.from(this.instances.keys())),
      hashObjectWithoutSourceInformation(Array.from(this.instances.values())),
    ]);
  }

  accept_EmbeddedDataVisitor<T>(visitor: V1_EmbeddedDataVisitor<T>): T {
    return visitor.visit_ModelStoreData(this);
  }
}
