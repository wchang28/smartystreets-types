export declare type StateCode = ('AK' | 'AL' | 'AR' | 'AZ' | 'CA' | 'CO' | 'CT' | 'DC' | 'DE' | 'FL' | 'GA' | 'GU' | 'HI' | 'IA' | 'ID' | 'IL' | 'IN' | 'KS' | 'KY' | 'LA' | 'MA' | 'MD' | 'ME' | 'MI' | 'MN' | 'MO' | 'MS' | 'MT' | 'NC' | 'ND' | 'NE' | 'NH' | 'NJ' | 'NM' | 'NV' | 'NY' | 'OH' | 'OK' | 'OR' | 'PA' | 'PR' | 'RI' | 'SC' | 'SD' | 'TN' | 'TX' | 'UT' | 'VA' | 'VT' | 'WA' | 'WI' | 'WV' | 'WY');
export interface GeoCoordinates {
    latitude?: number;
    longitude?: number;
}
export declare type GeoPrecision = "Unknown" | "None" | "State" | "SolutionArea" | "City" | "Zip5" | "Zip6" | "Zip7" | "Zip8" | "Zip9" | "Structure";
export interface GeoCoordinatesWithPrecision extends GeoCoordinates {
    precision?: GeoPrecision;
}
export declare namespace USStreetAddress {
    type AddressMatchType = "strict" | "range" | "invalid";
    interface QueryParamsItem {
        input_id?: string;
        street?: string;
        street2?: string;
        secondary?: string;
        city?: string;
        state?: string;
        zipcode?: string;
        lastline?: string;
        addressee?: string;
        urbanization?: string;
        candidates?: number;
        match?: AddressMatchType;
    }
    type QueryParams = QueryParamsItem | QueryParamsItem[];
    interface Components {
        urbanization?: string;
        primary_number?: string;
        street_name?: string;
        street_predirection?: string;
        street_postdirection?: string;
        street_suffix?: string;
        secondary_number?: string;
        secondary_designator?: string;
        extra_secondary_number?: string;
        extra_secondary_designator?: string;
        pmb_designator?: string;
        pmb_number?: string;
        city_name?: string;
        default_city_name?: string;
        state_abbreviation?: StateCode;
        zipcode?: string;
        plus4_code?: string;
        delivery_point?: string;
        delivery_point_check_digit?: string;
    }
    type RecordType = "F" | "G" | "H" | "P" | "R" | "S";
    type ZipType = "Unique" | "Military" | "POBox" | "Standard";
    type ResidentialDeliveryIndicator = "Residential" | "Commercial";
    type eLOTSoreOrder = "A" | "D";
    type CoordinatesPrecision = GeoPrecision;
    interface Metadata {
        record_type?: RecordType;
        zip_type?: ZipType;
        county_fips?: string;
        county_name?: string;
        carrier_route?: string;
        congressional_district?: string;
        building_default_indicator?: string;
        rdi?: ResidentialDeliveryIndicator;
        elot_sequence?: string;
        elot_sort?: eLOTSoreOrder;
        latitude?: number;
        longitude?: number;
        precision?: CoordinatesPrecision;
        time_zone?: string;
        utc_offset?: number;
        dst?: boolean;
    }
    type YesOrNo = "Y" | "N";
    type DVPMatchCode = "Y" | "N" | "S" | "D";
    type LACSLinkCode = "A" | "00" | "09" | "14" | "92";
    type LACSLinkIndicator = "Y" | "S" | "N" | "F";
    interface Analysis {
        dpv_match_code?: DVPMatchCode;
        dpv_footnotes?: string;
        dpv_cmra?: YesOrNo;
        dpv_vacant?: YesOrNo;
        active?: YesOrNo;
        ews_match?: boolean;
        footnotes?: string;
        lacslink_code?: LACSLinkCode;
        lacslink_indicator?: LACSLinkIndicator;
        suitelink_match?: boolean;
    }
    interface QueryResultItem {
        input_id?: string;
        input_index?: number;
        candidate_index?: number;
        addressee?: string;
        delivery_line_1?: string;
        delivery_line_2?: string;
        last_line?: string;
        delivery_point_barcode?: string;
        components?: Components;
        metadata?: Metadata;
        analysis?: Analysis;
    }
    type QueryResult = QueryResultItem[];
}
export declare namespace USAutocomplete {
    interface QueryParams {
        prefix: string;
        suggestions?: number;
        city_filter?: string;
        state_filter?: string;
        prefer?: string;
        prefer_ratio?: number;
        geolocate?: boolean;
        geolocate_precision?: string;
    }
    interface Suggestion {
        text?: string;
        street_line?: string;
        city?: string;
        state?: string;
    }
    interface QueryResult {
        suggestions: Suggestion[];
    }
}
export declare namespace InternationalStreetAddress {
    interface QueryParams {
        input_id?: string;
        country: string;
        geocode?: string;
        language?: string;
        freeform?: string;
        address1?: string;
        address2?: string;
        address3?: string;
        address4?: string;
        organization?: string;
        locality?: string;
        administrative_area?: string;
        postal_code?: string;
    }
    interface Components {
        country_iso_3?: string;
        super_administrative_area?: string;
        administrative_area?: string;
        sub_administrative_area?: string;
        dependent_locality?: string;
        dependent_locality_name?: string;
        double_dependent_locality?: string;
        locality?: string;
        postal_code?: string;
        postal_code_short?: string;
        postal_code_extra?: string;
        premise?: string;
        premise_extra?: string;
        premise_number?: string;
        premise_type?: string;
        thoroughfare?: string;
        thoroughfare_predirection?: string;
        thoroughfare_postdirection?: string;
        thoroughfare_name?: string;
        thoroughfare_trailing_type?: string;
        thoroughfare_type?: string;
        dependent_thoroughfare?: string;
        dependent_thoroughfare_predirection?: string;
        dependent_thoroughfare_postdirection?: string;
        dependent_thoroughfare_name?: string;
        dependent_thoroughfare_trailing_type?: string;
        dependent_thoroughfare_type?: string;
        building?: string;
        building_leading_type?: string;
        building_name?: string;
        building_trailing_type?: string;
        sub_building_type?: string;
        sub_building_number?: string;
        sub_building_name?: string;
        sub_building?: string;
        post_box?: string;
        post_box_type?: string;
        post_box_number?: string;
    }
    type GeocodePrecision = "None" | "AdministrativeArea" | "Locality" | "Thoroughfare" | "Premise" | "DeliveryPoint";
    interface Metadata {
        latitude?: number;
        longitude?: number;
        geocode_precision?: GeocodePrecision;
        max_geocode_precision?: string;
        address_format?: string;
    }
    type VerificationStatus = "None" | "Partial" | "Ambiguous" | "Verified";
    type AddressPrecision = "None" | "AdministrativeArea" | "Locality" | "Thoroughfare" | "Premise" | "DeliveryPoint";
    interface Analysis {
        verification_status?: VerificationStatus;
        address_precision?: AddressPrecision;
    }
    interface QueryResultItem {
        input_id?: string;
        organization?: string;
        "address1-12"?: string;
        components?: Components;
        metadata?: Metadata;
        analysis?: Analysis;
    }
    type QueryResult = QueryResultItem[];
}
export declare namespace USZipCode {
    interface QueryParamsItem {
        input_id?: string;
        city?: string;
        state?: string;
        zipcode?: string;
    }
    type QueryParams = QueryParamsItem | QueryParamsItem[];
    interface CityState {
        city?: string;
        state_abbreviation?: StateCode;
        state?: string;
        mailable_city?: boolean;
    }
    type ZipCodeType = "S" | "M" | "P" | "U";
    type CoordinatesPrecision = GeoPrecision;
    interface ZipCode {
        zipcode?: string;
        zipcode_type?: ZipCodeType;
        default_city?: string;
        county_fips?: string;
        county_name?: string;
        state_abbreviation?: StateCode;
        state?: string;
        latitude?: number;
        longitude?: number;
        precision?: CoordinatesPrecision;
    }
    type ResultStatus = "blank" | "invalid_state" | "invalid_city" | "invalid_zipcode" | "conflict";
    interface QueryResultItem {
        input_index?: number;
        input_id?: string;
        city_states?: CityState[];
        zipcodes?: ZipCode[];
        status?: ResultStatus;
        reason?: string;
    }
    type QueryResult = QueryResultItem[];
}
