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
            from_field: string;
            from_model_label: string;
            from_model: string;
            to_field: string;
        }>;
        toOne: {
            [index: string]: {
                to_model: string;
                to_model_label: string;
                to_field: string;
            };
        };
    };
}

export interface IViewEvent {
    id: string;
    user: {
        username: string;
        first_name: string;
        last_name: string;
        email: string;
        id: number;
        bio: string;
        display_name: string;
        image: string;
    };
    action: {
        id: string;
        flow: number;
        name: string;
        args: string[];
        category: string;
    };
    created_time: string;
    note: string;
    entity_id: string;
    type: 'action' | 'note';
    view: string;
}

export interface IViewEventsResponse {
    model_events: IViewEvent[];
    meta: {
        total_results: number;
        total_pages: number;
        page: number;
        per_page: number;
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
    model: {
        id: string;
        type: string;
        list_flow: number;
        detail_flow: number;
        pk_field: string[];
        relations: any;
        field_types: {
            [index: string]: {
                type: string;
            };
        };
        schema_mapper: any;
        type_args: any;
        model_id: string;
    };
}

export interface IZendeskFetchData {
    modules: IModule[];
    views_by_model_id: { [index: string]: IView };
    view: IView;
    email_field: string;
    view_data: any;
}
