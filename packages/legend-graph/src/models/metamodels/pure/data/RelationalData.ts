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
import { CORE_HASH_STRUCTURE } from '../../../../MetaModelConst.js';
import { type EmbeddedDataVisitor, EmbeddedData } from './EmbeddedData.js';

export class RelationalDataTableColumn implements Hashable {
  value!: string;

  get hashCode(): string {
    return hashArray([
      CORE_HASH_STRUCTURE.RELATIONAL_DATA_TABLE_COLUMN,
      this.value,
    ]);
  }
}
export class RelationalDataTableRow implements Hashable {
  values!: string;

  get hashCode(): string {
    return hashArray([
      CORE_HASH_STRUCTURE.RELATIONAL_DATA_TABLE_ROW,
      this.values,
    ]);
  }
}

export class RelationalDataTable implements Hashable {
  schemaName: string | undefined;
  tableName!: string;
  columns: RelationalDataTableColumn[] = [];
  rows: RelationalDataTableRow[] = [];

  get hashCode(): string {
    return hashArray([
      CORE_HASH_STRUCTURE.RELATIONAL_DATA_TABLE,
      this.schemaName ?? '',
      this.tableName,
      hashArray(this.columns),
      hashArray(this.rows),
    ]);
  }
}
export class RelationalData extends EmbeddedData implements Hashable {
  tables: RelationalDataTable[] = [];

  accept_EmbeddedDataVisitor<T>(visitor: EmbeddedDataVisitor<T>): T {
    return visitor.visit_RelationalData(this);
  }

  get hashCode(): string {
    return hashArray([
      CORE_HASH_STRUCTURE.RELATIONAL_DATA_TABLE,
      hashArray(this.tables),
    ]);
  }
}
