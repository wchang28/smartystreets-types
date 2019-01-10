export type StateCode = ('AK' | 'AL' | 'AR' | 'AZ' | 'CA' | 'CO' | 'CT' | 'DC' | 'DE' | 'FL' | 'GA' | 'GU' | 'HI' | 'IA' | 'ID' | 'IL' | 'IN' | 'KS' | 'KY' | 'LA' | 'MA' | 'MD' | 'ME' | 'MI' | 'MN' | 'MO' | 'MS' | 'MT' | 'NC' | 'ND' | 'NE' | 'NH' | 'NJ' | 'NM' | 'NV' | 'NY' | 'OH' | 'OK' | 'OR' | 'PA' | 'PR' | 'RI' | 'SC' | 'SD' | 'TN' | 'TX' | 'UT' | 'VA' | 'VT' | 'WA' | 'WI' | 'WV' | 'WY');

export type GeoPrecision
= "Unknown"         // Coordinates not known, possibly because address is invalid
| "None"            // Coordinates are not provided for this address. Military addresses such as APO, FPO, and DPO do not provide coordinates.
| "State"           // Reserved for future use
| "SolutionArea"    // Reserved for future use
| "City"            // Reserved for future use
| "Zip5"            // Accurate to a 5-digit ZIP Code level (least precise)
| "Zip6"            // Accurate to a 6-digit ZIP Code level
| "Zip7"            // Accurate to a 7-digit ZIP Code level
| "Zip8"            // Accurate to an 8-digit ZIP Code level
| "Zip9"            // Accurate to a 9-digit ZIP Code level (most precise but NOT rooftop level)
| "Structure"       // Reserved for future use
;

export namespace USStreetAddress {

    export type AddressMatchType
    = "strict"  // The API will ONLY return candidates that are valid USPS addresses. (default)
    | "range"   // The API will return candidates that are valid USPS addresses, as well as invalid addresses with primary numbers that fall within a valid range for the street.
    | "invalid" // The API will return a single candidate for every properly submitted address, even if invalid or ambiguous.
    ;

    export interface QueryParamsItem {
        input_id?: string;          // A unique identifier for this address used in your application; this field will be copied into the output.
        street?: string;            // blank The street line of the address, or the entire address ("freeform" input). Freeform inputs should NOT include any form of country information (like "USA").
        street2?: string;           // Any extra address information (e.g., Leave it on the front porch.)
        secondary?: string;         // Apartment, suite, or office number (e.g., "Apt 52" or simply "52"; not "Apt52".)
        city?: string;              // The city name
        state?: string;             // The state name or abbreviation
        zipcode?: string;           // The ZIP Code
        lastline?: string;          // City, state, and ZIP Code combined
        addressee?: string;         // The name of the recipient, firm, or company at this address
        urbanization?: string;      // Only used with Puerto Rico
        candidates?: number         // Max Value: 10 The maximum number of valid addresses returned when the input is ambiguous
        match?: AddressMatchType;   // The match output strategy to be employed for this lookup
    }

    export type QueryParams = QueryParamsItem | QueryParamsItem[];

    export interface Components {
        urbanization?: string;                  // Primarily for Puerto Rican addresses; a very important component which contains area, sector, or development within a geographic area; should be included after the name of the recipient
        primary_number?: string;                // The house, PO Box, or building number
        street_name?: string;	                // The name of the street
        street_predirection?: string;	        // Directional information before a street name (N, SW, etc.)
        street_postdirection?: string;	        // Directional information after a street name (N, SW, etc.)
        street_suffix?: string;	                // Abbreviated value describing the street (St, Ave, Blvd, etc.)
        secondary_number?: string;              // Apartment or suite number, if any
        secondary_designator?: string;	        // Describes location within a complex/building (Ste, Apt, etc.)
        extra_secondary_number?: string;        // Descriptive information about the location of a building within a campus (e.g., E-5 in "5619 Loop 1604, Bldg E-5, Ste. 101 San Antonio TX")
        extra_secondary_designator?: string;	// Description of the location type within a campus (e.g., Bldg, Unit, Lot, etc.)
        pmb_designator?: string;                // Private mailbox unit designator (assigned by a CMRA)
        pmb_number?: string;	                // The private mailbox number, assigned by a CMRA
        city_name?: string;                     // The USPS-preferred city name for this particular address
        default_city_name?: string;             // The default city name for this 5-digit ZIP Code. This field will not be present if the default city name is equal to the value of the city name field.
        state_abbreviation?: StateCode;         // The two-letter state abbreviation
        zipcode?: string;                       // The 5-digit ZIP Code
        plus4_code?: string;                    // The 4-digit add-on code (more specific than 5-digit ZIP)
        delivery_point?: string;                // The last two digits of the house/box number, unless an "H" record is matched, in which case this is the secondary unit number representing the delivery point information to form the delivery point barcode (DPBC).
        delivery_point_check_digit?: string;    // Correction character, or check digit, for the 11-digit barcode
    }

    export type RecordType
    = "F"   // Firm; the finest level of match available for an address. (e.g., Julie Julia 11300 Center Ave Gilroy CA 95020-9257)
    | "G"   // General Delivery; for mail to be held at local post offices. (e.g., General Delivery Provo UT 84601)
    | "H"   // High-rise; address contains apartment or building sub-units. (e.g., 1600 Pennsylvania Ave SE Washington DC 20003-3228)
    | "P"   // Post Office box; address is a PO Box record type. (e.g., PO Box 4735 Tulsa OK 74159-0735)
    | "R"   // Rural Route or Highway Contract; may have box number ranges. (e.g., RR 2 Box 4560 Anasco PR 00610-9393)
    | "S"   // Street; address contains a valid primary number range. (e.g., 16990 Monterey Rd Lake Elsinore CA 92530-7529)
    ;

    export type ZipType
    = "Unique"      // The ZIP Code consists of a single delivery point, pertaining to a United States Postal Service customer (like a large business or government agency) that routes all of its own mail internally.
    | "Military"    // The ZIP Code pertains to military units and diplomatic organizations, often in foreign locations.
    | "POBox"       // The ZIP Code is assigned to a collection of Post Office Boxes.
    | "Standard"    // The ZIP Code does not pertain to any of the above categories.
    ;

    export type ResidentialDeliveryIndicator
    = "Residential" // The address is a residential address.
    | "Commercial"  // The address is a commercial address.
    ;

    export type eLOTSoreOrder
    = "A"   // Ascending
    | "D"   // Descending
    ;

    export type CoordinatesPrecision = GeoPrecision;

    export interface Metadata {
        record_type?: RecordType;               // Indicates the type of record that was matched. Only given if a DPV match is made.
        zip_type?:  ZipType;                    // Indicates the type of the ZIP Code for the address that was matched. Only given if a 5-digit match is made.
        county_fips?: string;                   // The 5-digit county FIPS (Federal Information Processing Standards) code. It is a combination of a 2-digit state FIPS code and a 3-digit county code assigned by the NIST (National Institute of Standards and Technology).
        county_name?: string;	                // The name of the county the address is in
        carrier_route?: string;	                // The postal carrier route for the address
        congressional_district?: string;        // The congressional district to which the address belongs. Output will be two digits from 01 - 53 or "AL." "AL" means that the entire state (or territory) is covered by a single congressional district. These include Alaska, Delaware, Montana, North Dakota, South Dakota, Vermont, Wyoming, Washington DC, Virgin Islands, and other territories.
        building_default_indicator?: string;    // Indicates whether the address is the "default" address for a building; for example, the main lobby
        rdi?: ResidentialDeliveryIndicator;     // Residential Delivery Indicator (residential or commercial)
        elot_sequence?: string;	                // eLOT (Enhanced Line of Travel) 4-digit sequence number
        elot_sort?: eLOTSoreOrder;              // eLOT (Enhanced Line of Travel) product was developed to give mailers the ability to sort their mailings by line of travel sequence.
        latitude?: number;                      // The horizontal component used for geographic positioning. It is the angle between 0° (the equator) and ±90° (north or south) at the poles. It is the first value in an ordered pair of (latitude, longitude). A negative number denotes a location below the equator; a positive number is above the equator. Combining lat/long values enables you to pinpoint addresses on a map.
        longitude?: number;                     // The vertical component used for geographic positioning. It is the angle between 0° (the Prime Meridian) and ±180° (westward or eastward). It is the second number in an ordered pair of (latitude, longitude). A negative number indicates a location west of Greenwich, England; a positive number east. Combining lat/long values enables you to pinpoint addresses on a map.
        precision?: CoordinatesPrecision        // Indicates the precision of the latitude and longitude values.
                                                /*
                                                    Note: Concerning addresses for which the ZIP9 precision is not available, the ZIP# precision is interpolated based on neighboring addresses. Thus, ZIP7 is an average of all the lat/long coordinates of nearby ZIP Codes that share those first 7 digits.
                                                */
        time_zone?: string;                     // Indicates the common name of the time zone associated with the address. Valid Responses Alaska, Atlantic, Central, Eastern, Hawaii, Mountain, None, Pacific, Samoa, UTC+9, UTC+10, UTC+11, UTC+12
        utc_offset?: number;                    // Indicates the number of hours the time zone is offset from Universal Time Coordinated (UTC), the international time standard, also known as Greenwich Meridian Time (GMT). Valid Responses -11, -10, -9, -8, -7, -6, -5, -4, 0, 9, 10, 11, 12
        dst?: boolean;	                        // Indicates if the time zone "obeys," or, in other words, adjusts their clocks forward and back with the seasons. This information is particularly useful to determine time in other time zones with areas that may or may not use daylight saving time - for example, Arizona, Hawaii, and, of all places, Indiana.
                                                /*
                                                    true — Time zone observes daylight saving time.
                                                    If dst is absent from the response, then time zone does not observe daylight saving time.
                                                */
    }

    export type YesOrNo = "Y" | "N";

    export type DVPMatchCode
    = "Y"   // Confirmed; entire address was DPV confirmed deliverable. (e.g., 1600 Amphitheatre Pkwy Mountain View, CA)
    | "N"   // Not Confirmed; address could not be DPV confirmed as deliverable.
    | "S"   // Confirmed By Dropping Secondary; address was DPV confirmed by dropping secondary info (apartment, suite, etc.). (e.g., 62 Ea Darden Dr Apt 298 Anniston, AL)
    | "D"   // Confirmed - Missing Secondary Info; the address was DPV confirmed, but it is missing secondary information (apartment, suite, etc.). (e.g., 122 Mast Rd Lee, NH)
            // [blank] — The address was not submitted for DPV. This is usually because the address does not have a ZIP Code and a +4 add-on code, or the address has already been determined to be Not Deliverable (only returned as part of the XML response).
    ;

    export type LACSLinkCode
    = "A"   // Match: Address provided. LACSLink record match was found, and a converted address was provided.
    | "00"  // No Match. No converted address. No soup for you!
    | "09"  // Match: No new address. LACSLink matched an input address to an old address which is a "high-rise default" address; no new address was provided.
    | "14"  // Match: No conversion. Found a LACSLink record, but couldn't convert the data to a deliverable address.
    | "92"  // Match: Dropped secondary number. LACSLink record was matched after dropping the secondary number from input.
            // [blank] — No LACSLink lookup attempted.
    ;

    export type LACSLinkIndicator
    = "Y"   // LACS record match; a new address could be furnished because the input record matched a record in the master file.
    | "S"   // LACS record - secondary number dropped; the record is a ZIP+4 street level or high-rise match. The input record matched a master file record, but the input address had a secondary number and the master file record did not.
    | "N"   // No match; a new address could not be furnished; the input record could not be matched to a record in the master file.
    | "F"   // False positive; a false positive record was detected.
            // [blank] — No LACSLink lookup attempted.
    ;

    export interface Analysis {
        dpv_match_code?: DVPMatchCode;              // Status of the Delivery Point Validation (DPV). This lets you know if the USPS delivers mail to the address.
        dpv_footnotes?: string;                     // Indicates why the address was given its DPV value and potentially the type of ZIP Code that was matched. All these footnotes have a length of 2 characters, and there may be up to 14 footnotes.
                                                    /*
                                                        Indicates why the address was given its DPV value and potentially the type of ZIP Code that was matched. All these footnotes have a length of 2 characters, and there may be up to 14 footnotes.

                                                        AA — City/state/ZIP + street are all valid.
                                                        (e.g., 2335 S State St Ste 300 Provo UT)
                                                        A1 — ZIP+4 not matched; address is invalid. (City/state/ZIP + street don't match.)
                                                        (e.g., 3214 N University Ave New York NY)
                                                        BB — ZIP+4 matched; confirmed entire address; address is valid.
                                                        (e.g., 2335 S State St Ste 300 Provo UT)
                                                        CC — Confirmed address by dropping secondary (apartment, suite, etc.) information.
                                                        (e.g., 2335 S State St Ste 500 Provo UT)
                                                        F1 — Matched to military or diplomatic address.
                                                        (e.g., Unit 2050 Box 4190 APO AP 96278)
                                                        G1 — Matched to general delivery address.
                                                        (e.g., General Delivery Provo UT 84601)
                                                        M1 — Primary number (e.g., house number) is missing.
                                                        (e.g., N University Ave Provo UT)
                                                        M3 — Primary number (e.g., house number) is invalid.
                                                        (e.g., 16 N University Ave Provo UT)
                                                        N1 — Confirmed with missing secondary information; address is valid but it also needs a secondary number (apartment, suite, etc.).
                                                        (e.g., 2335 S State St Provo UT)
                                                        PB — Confirmed as a PO BOX street style address.
                                                        (e.g., 555 S B B King Blvd Unit 1 Memphis TN 38103)
                                                        P1 — PO, RR, or HC box number is missing.
                                                        (e.g., RR 7 Broken Arrow OK)
                                                        P3 — PO, RR, or HC box number is invalid.
                                                        (e.g., HC 2 Box 4155 Luquillo PR 40615)
                                                        RR — Confirmed address with private mailbox (PMB) info.
                                                        (e.g., 3214 N University Ave #409 Provo UT)
                                                        R1 — Confirmed address without private mailbox (PMB) info.
                                                        (e.g., 3214 N University Ave Provo UT)
                                                        R7 — Confirmed as a valid address that doesn't currently receive US Postal Service street delivery.
                                                        (e.g., 6D Cruz Bay St John VI 00830)
                                                        U1 — Matched a unique ZIP Code.
                                                        (e.g., 100 North Happy Street 12345)

                                                        Here are some common combinations:
                                                        AABB - ZIP, state, city, street, and primary number match.
                                                        AAM1 - ZIP, state, city, and street match, but the primary number is missing.
                                                        AAM3 - ZIP, state, city, and street match, but the primary number is invalid.
                                                        AAN1 - ZIP, state, city, street, and primary number match, but there is secondary information such as apartment or suite that would be helpful.
                                                        A1 - Just plain bad address; can't match street to city/state/ZIP combination
                                                        AABBR1 - ZIP, state, city, street, and primary number match. Address confirmed without private mailbox (PMB) info.
                                                    */
        dpv_cmra?: YesOrNo;                         // Indicates whether the address is associated with a Commercial Mail Receiving Agency (CMRA), also known as a private mailbox (PMB) operator. A CMRA is a business through which USPS mail may be sent or received, for example the UPS Store and Mailboxes Etc.
                                                    /*
                                                        Y — Address is associated with a valid CMRA.
                                                        N — Address is not associated with a valid CMRA.
                                                        [blank] — Address was not submitted for CMRA verification.
                                                    */
        dpv_vacant?: YesOrNo;                       // Indicates that a delivery point was active in the past but is currently vacant (in most cases, unoccupied over 90 days) and is not receiving deliveries. This status is often obtained when mail receptacles aren't being emptied and are filling up, so mail is held at the post office for a certain number of days before the delivery point is marked vacant.
                                                    /*
                                                        Y — Address is vacant.
                                                        N — Address is not vacant.
                                                        [blank] — Address was not submitted for vacancy verification.
                                                    */
        active?: YesOrNo;                           // Indicates whether the address is active, or "in-service" according to the USPS. Examples: New developments may have addresses but will be "inactive" until somebody moves in. Or, after Hurricane Katrina, addresses in the affected area were marked as inactive for a time. Residents may also mark their own mailboxes as inactive for privacy and other reasons.
                                                    /*
                                                        Y — Address is active.
                                                        N — Address is inactive.
                                                        [blank] — Activity status is not known by the USPS.
                                                    */
        ews_match?: boolean;                        // Early warning system flag; a positive result indicates the street of the address is not yet ready for mail delivery and that the address will soon be added to the master ZIP+4 file in the coming weeks or months. This commonly occurs for new streets or streets undergoing a name change.
                                                    /*
                                                        true — The address was flagged by EWS, preventing a ZIP+4 match.
                                                        [blank] — Address was not flagged by EWS.
                                                    */
        footnotes?: string;                         // Indicates which changes were made to the input address. Footnotes are delimited by a # character. See the footnotes table below for details.
        lacslink_code?: LACSLinkCode;               // The reason for the LACSLink indication that was given
        lacslink_indicator?: LACSLinkIndicator;     // Indicates whether there is an address match in the LACSLink database.
        suitelink_match?: boolean;                  // Indicates a match (or not) to the USPS SuiteLink data. SuiteLink attempts to provide secondary information such as "suite" or "apartment" whenever there is a match based on address and Firm Name (Company) input.
                                                    /*
                                                        true — There was a SuiteLink match and the result is provided.
                                                        false — There was no SuiteLink match.
                                                    */
    }

    export interface QueryResultItem {
        input_id?: string;                  // Any unique identifier that you use to reference the input address; the output will be identical to the input.
        input_index?: number;	            // The order in which this address was submitted with the others (0 if alone)
        candidate_index?: number;           // An input address can match multiple valid addresses. This ties the candidates to the input index. (e.g., "1 Rosedale Street Baltimore Maryland" will return multiple candidates.)
        addressee?: string;                 // Will usually contain a firm name; intended recipient at an address
        delivery_line_1?: string;           // Contains the first delivery line (usually the street address). This can include any of the following:
                                            /*
                                                Primary Number
                                                Street Name
                                                Street Predirection
                                                Street Postdirection
                                                Street Suffix
                                                Secondary Number
                                                Secondary Designator
                                                PMB Designator
                                                PMB Number
                                            */
        delivery_line_2?: string;           // The second delivery line (if needed). It is common for this field to remain empty, but it may contain a private mailbox number.
        last_line?: string;                 // City, state, and ZIP Code combined
        delivery_point_barcode?: string;    // 12-digit POSTNET™ barcode; consists of 5-digit ZIP Code, 4-digit add-on code, 2-digit delivery point, and 1-digit check digit.
        components?: Components;
        metadata?: Metadata;
        analysis?: Analysis;
    }

    export type QueryResult = QueryResultItem[];

}

export namespace USAutocomplete {

    export interface QueryParams {
        prefix: string;                 // Required. The part of the address that has already been typed. Maximum length is 128 bytes.
        suggestions?: number;           // Maximum number of address suggestions, range [1, 10]. Default is 10.
        city_filter?: string;           // A list of city names, separated by commas, to which to limit the results. See filtering for more information.
        state_filter?: string;          // A list of state names (2-letter abbreviations), separated by commas, to which to limit the results. See filtering for more information.
        prefer?: string;                // A list of cities/states to prefer at the top of the results. See preferencing for more information.
        prefer_ratio?: number;          // Specifies the percentage of address suggestions that should be from preferred cities/states. Expressed as a decimal value, range [0, 1] (input out of bounds is adjusted). See preferencing for more information.
        geolocate?: boolean;            // Whether to prefer address suggestions in the user's city and state, based on their IP address.
        geolocate_precision?: string;   // If the geolocate field is set to true then setting this field to city causes the geolocated results that bubble up to the top of the response to be from the city/state corresponding to the sender's IP address. Setting this field to state causes results from the sender's entire state to be preferred.
    }

    export interface Suggestion {
        text?: string;
        street_line?: string;
        city?: string;
        state?: string;
    }

    export interface QueryResult {
        suggestions: Suggestion[];
    }
}

export namespace InternationalStreetAddress {

    export interface QueryParams {
        input_id?: string;              // A unique identifier generated by you for this address for use within your application; this field will be copied into the output. (e.g., 123456)
        country: string;                // (required) This must be entered with every address. Country Name or ISO classification (ISO-3, ISO-2 or ISO-N). Address validation will fail if this is missing. (e.g., Brazil, BRA, BR, or 076)
        geocode?: string;               // Set to true to enable geocoding (disabled by default). See the examples section for, well, an example.
        language?: string;              // When not set, the output language will match the language of the input values. When set to native the results will always be in the language of the output country. When set to latin the results will always be provided using a Latin character set.
        freeform?: string;              // The entire address in a single field (without the country). If freeform is specified, all other address input fields (except country) will be ignored. (e.g., Via Santa Maria di Costantinopoli, 72 46030-Tabellano MN)
        address1?: string;              // The first address line (e.g., Calle Proc. San Sebastián, 15)
        address2?: string;              // The second address line (if any)
        address3?: string;              // The third address line (if any)
        address4?: string;              // The fourth address line (if any)
        organization?: string;          // The name of the recipient, firm, or company at this address (e.g., Robert Smith OR The Clean Oil Company)
        locality?: string;              // The city name (e.g., Paris)
        administrative_area?: string;   // The state or province name or abbreviation (e.g., Alberta or AB)
        postal_code?: string;           // The postal code (e.g., 90210-2301)
    }

    export interface Components {
        country_iso_3?: string;                         // The ISO 3166-1 alpha-3 country code. See our full listing for details.
        super_administrative_area?: string;             // The largest administrative division within a country (e.g., region in France)
        administrative_area?: string;                   // The most common administrative division within a country (e.g., province in Canada)
        sub_administrative_area?: string;               // The smallest administrative division within a country (e.g., county in Germany)
        dependent_locality?: string;                    // If there is additional information about the locality, it will be here. (e.g., neighborhood in Turkey)
        dependent_locality_name?: string;               // If the dependent_locality has a name, you'll find it here. (E.g., the dependent_locality "Dong Cheng Qu" is named "Dong Cheng.")
        double_dependent_locality?: string;             // If there is additional information about the dependent_locality, you'll find it here. (e.g., village in the United Kingdom)
        locality?: string;                              // Within a country, this is the most common population center. (e.g., city in Chile)
        postal_code?: string;                           // The complete postal code for the delivery point (e.g., V6G1V9 in Canada)
        postal_code_short?: string;                     // Primary postal code information (e.g., 90210 in the United States)
        postal_code_extra?: string;                     // Secondary postal code information (e.g., 3425 in the United States)
        premise?: string;                               // Alphanumeric code pertaining to an individual location
        premise_extra?: string;                         // Extra information about the premise that is not necessarily authoritative but might still be useful (E.g., in a French address, 25 bis rue Emile Zola, 91190 Gif Sur Yvette, France, the premise number could be followed by the word "bis" which would be considered premise_extra data.)
        premise_number?: string;                        // The alphanumeric component of the premise field (E.g., if premise contains "Plot 7/7A" premise_number would contain "7/7A.")
        premise_type?: string;                          // The premise type component of the premise field (E.g., if premise contains "Plot 7/7A" premise_type would contain "Plot.")
        thoroughfare?: string;                          // All thoroughfare components combined
        thoroughfare_predirection?: string;             // The directional prefix component of the thoroughfare (E.g., if thoroughfare contains "N Main St" thoroughfare_predirection would contain "N."
        thoroughfare_postdirection?: string;            // The directional suffix component of the thoroughfare (E.g., if thoroughfare contains "Main St N" thoroughfare_postdirection would contain "N.")
        thoroughfare_name?: string;                     // The name component of the thoroughfare (E.g., if thoroughfare contains "Main St" thoroughfare_name would contain "Main.")
        thoroughfare_trailing_type?: string;            // The trailing thoroughfare type component of the thoroughfare (E.g., if thoroughfare contains "N Main St" thoroughfare_trailing_type would contain "St.")
        thoroughfare_type?: string;                     // The leading thoroughfare type component of the thoroughfare (E.g., if thoroughfare contains "Rue De La Gare" thoroughfare_leading_type would contain "Rue.")
        dependent_thoroughfare?: string;                // All of the dependent thoroughfare components combined
        dependent_thoroughfare_predirection?: string;   // The directional prefix component of the dependent_thoroughfare (E.g., if dependent_thoroughfare contains "N Main St" dependent_thoroughfare_predirection would contain "N.")
        dependent_thoroughfare_postdirection?: string;  // The directional suffix component of the dependent_thoroughfare (E.g., if dependent_thoroughfare contains "Main St N" dependent_thoroughfare_postdirection would contain "N.")
        dependent_thoroughfare_name?: string;           // The name component of the dependent_thoroughfare (E.g., if dependent_thoroughfare contains "N Main St" dependent_thoroughfare_name would contain "Main.")
        dependent_thoroughfare_trailing_type?: string;  // The trailing dependent_thoroughfare type component of the dependent_thoroughfare (E.g., if dependent_thoroughfare contains "N Main St" dependent_thoroughfare_trailing_type would contain "St.")
        dependent_thoroughfare_type?: string;           // The leading thoroughfare type component of the dependent_thoroughfare field (E.g., if dependent_thoroughfare contains "Rue De La Gare" dependent_thoroughfare_type would contain "Rue.")
        building?: string;                              // The descriptive name that identifies an individual location, if one exists
        building_leading_type?: string;                 // The leading building type component of the building (E.g., if building contains "Bloc C" building_leading_type would contain "Bloc.")
        building_name?: string;                         // The name component of the building (E.g., if building contains "Westminster House" building_name would contain "Westminster.")
        building_trailing_type?: string;                // The trailing building type component of the building (E.g., if building contains "Westminster House" building_trailing_type would contain "House.")
        sub_building_type?: string;                     // The leading sub-building type of the sub_building (E.g., if sub_building contains "Flat 1" sub_building_type would contain "Flat.")
        sub_building_number?: string;                   // The alphanumeric component of the sub_building (E.g., if sub_building contains "Flat 1" sub_building_number would contain "1.")
        sub_building_name?: string;                     // The descriptive name component of the sub_building (E.g., if sub_building contains "Basement Flat" sub_building_name would contain "Basement.")
        sub_building?: string;                          // All sub_building components combined
        post_box?: string;                              // All post_box Post Office Box components combined
        post_box_type?: string;                         // The type component of the post_box (E.g., if post_box contains "PO Box 1234" post_box_type would contain "PO Box.")
        post_box_number?: string;                       // The alphanumeric component of the postbox (E.g., if post_box contains "PO Box 1234" post_box_number would contain "1234.")
    }

    export type GeocodePrecision
    = "None"                // Coordinates not known, possibly because address is invalid.
    | "AdministrativeArea"  // Coordinate is only accurate down to the administrative area. (e.g., typically a state or province)
    | "Locality"            // Coordinate is only accurate down to the locality level. (e.g., typically a city or town)
    | "Thoroughfare"        // Geocode is only accurate down to the thoroughfare level. (e.g., typically a street)
    | "Premise"             // Geocode is accurate down to the premise level.(e.g., typically an individual property or building)
    | "DeliveryPoint"       // Geocode is accurate down to the actual delivery point. (e.g., rooftop level)
    ;

    export interface Metadata {
        latitude?: number;                      // The horizontal component used for geographic positioning; it is the angle between 0° (the equator) and ±90° (north or south) at the poles measured in decimal degrees. It is the first value in an ordered pair of latitude, longitude. A negative number denotes a location south of the equator; a positive number is north. Combining lat/long values enables you to pinpoint addresses on a map.
        longitude?: number;                     // The vertical component used for geographic positioning; it is the angle between 0° (the Prime Meridian) and ±180° (westward or eastward) measured in decimal degrees. It is the second number in an ordered pair of (latitude, longitude). A negative number indicates a location west of Greenwich, England; a positive number east. Combining lat/long values enables you to pinpoint addresses on a map.
        geocode_precision?: GeocodePrecision    // Indicates the precision of the latitude and longitude values.
        max_geocode_precision?: string;         // Indicates the highest possible geocode_precision for the address.
        address_format?: string;                // A template that shows where we positioned the different address components on line 1, line 2, etc. (The format changes from one country to another.)
                                                /*
                                                    Example:
                                                    
                                                    building | premise thoroughfare | postal_code locality
                                                    
                                                    Each "pipe" character (|) represents a line break. Following this guide, the numbered address fields would be composed accordingly:
                                                    
                                                    Address 1: building
                                                    Address 2: premise thoroughfare
                                                    Address 3: postal_code locality
                                                    This value is always blank for US addresses. Here's some additional info on the composition of US addresses.
                                                */
    }

    export type VerificationStatus
    = "None"        // Status not known, possibly because the address is invalid.
    | "Partial"     // Parts of the address were matched (at the indicated precision level). Better input might result in a better match.
    | "Ambiguous"   // The input address has more than one match within our dataset (at the indicated precision level).
    | "Verified"    // The entire address was verified (at the indicated precision level).
    ;

    export type AddressPrecision
    = "None"                // Address not known, possibly because this address is invalid.
    | "AdministrativeArea"  // Address is only verified down to the administrative area. (e.g., typically a state or province)
    | "Locality"            // Address is only verified down to the locality. (e.g., typically a city or town)
    | "Thoroughfare"        // Address is only verified down to the thoroughfare level. (e.g., typically a street)
    | "Premise"             // Address is verified down to the premise level. (e.g., typically an individual property or building)
    | "DeliveryPoint"       // Address is verified down to the delivery point. (e.g., rooftop level)
    ;

    export interface Analysis {
        verification_status?: VerificationStatus;   // Indicates the verification status of the address.
        address_precision?: AddressPrecision;       // Indicates the precision of the address values.
    }

    export interface QueryResultItem {
        input_id?: string;              // A unique identifier generated by you for this address for use within your application. The output will be identical to the value you provided in the request input_id.
        organization?: string;          // The name of the recipient, firm, or company at this address. The output will be identical to the input.
        "address1-12"?: string;         // If verification_status = verified these fields will contain the correctly formatted address for mailing in the relevant country, split into individual address lines. If verification_status ≠ verified the address fields may contain standardized address information or even the original input data.
        components?: Components;
        metadata?: Metadata;
        analysis?: Analysis;
    }

    export type QueryResult = QueryResultItem[];
}

export namespace USZipCode {

    export interface QueryParamsItem {
        input_id?: string;          // A unique identifier for this address used in your application; this field will be copied into the output.
        city?: string;              // The city name
        state?: string;             // The state name or abbreviation
        zipcode?: string;           // The ZIP Code
    }

    export type QueryParams = QueryParamsItem | QueryParamsItem[];

    export interface CityState {
        city?: string;                  // The name of the city
        state_abbreviation?: StateCode; // The official, two-letter state abbreviation
        state?: string;                 // The state name
        mailable_city?: boolean;        // A boolean value indicating whether or not the city name is an approved USPS mailing name
    }

    export type ZipCodeType
    = "S"                               // Standard (regular ZIP Code)
    | "M"                               // Military (APO/FPO military ZIP Code. Also includes DPO - Diplomatic addresses)
    | "P"                               // P.O. Box (serves only post-office boxes)
    | "U"                               // Unique (belongs primarily to a firm)
    ;

    export type CoordinatesPrecision = GeoPrecision;

    export interface ZipCode {
        zipcode?: string;                   // The 5-digit ZIP Code
        zipcode_type?: ZipCodeType;         // The type of ZIP Code.
        default_city?: string;              // A string containing the default city name for this ZIP Code
        county_fips?: string;               // The county FIPS code
        county_name?: string;               // The name of the county
        state_abbreviation?: StateCode;     // The official, two-letter state abbreviation
        state?: string;                     // The state name
        latitude?: number;                  // The approximate latitude geo-coordinate
        longitude?: number;                 // The approximate longitude geo-coordinate
        precision?: CoordinatesPrecision;   // Indicates the precision of the latitude and longitude values.
    }

    export type ResultStatus
    = "blank"                           // Blank lookup (you must provide a ZIP Code and/or City/State combination).
    | "invalid_state"                   // Invalid State name or abbreviation.
    | "invalid_city"                    // Invalid City for the given State.
    | "invalid_zipcode"                 // Invalid ZIP Code.
    | "conflict"                        // Conflicting ZIP Code/City/State information.
    ;

    export interface QueryResultItem {
        input_index?: number;           // The positional index, or ordering, of the input that is associated with this result
        input_id?: string;              // Any unique identifier that you used to reference the input address. The output will be identical to the input.
        city_states?: CityState[];      // A list of cities and their states that match the input
        zipcodes?: ZipCode[];           // A list of ZIP Codes that match the input
        status?: ResultStatus;          // For a lookup with no matches, status classifies the kind of failure and always comes with a reason
        reason?: string;                // For a lookup with no matches, reason explains why the lookup failed
    }

    export type QueryResult = QueryResultItem[];
}