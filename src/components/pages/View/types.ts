interface IFieldType {
    type: 'text' | 'email' | 'integer' | 'iso8601' | 'currency' | 'tel';
}

export interface IModuleFetchData {
    field_display_names: {
        [index: string]: string;
    };
    field_types: {
        [index: string]: IFieldType;
    };
    item: any;
    relations: {
        toMany: Array<{
            count: null | number;
            from_column: string;
            from_table: string;
            to_column: string;
        }>;
        toOne: {
            [index: string]: {
                to_table: string;
                to_column: string;
            };
        };
    };
}

export interface IModule {
    name: string;
    display_fields: string[];
    data: null | IModuleFetchData;
    error: {
        detail: string;
    } | null;
}

export interface IView {
    id: string;
}

export interface IZendeskFetchData {
    modules: IModule[];
    views_by_id: { [index: string]: IView };
    view: IView;
    email_field: string;
}
