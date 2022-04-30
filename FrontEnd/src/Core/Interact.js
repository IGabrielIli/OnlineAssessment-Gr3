export const DBType = {
    // format: group_item
    PROJECT_TITLE: 100,
    USER_USERNAME: 500,
    ASSESSMENT_NAME: 600,
    ASSESSMENT_ID: 601,
    ASSESSMENT_DATE: 602,
};
Object.freeze(DBType); // forces fail upon trying to add new objects

// This function will fetch stuff from the back end when its implemented
// Type is the type of data. Key is optional, for data that are picked from arrays
export function fetchDynamicItem(type, key) {
    let ret;
    switch(type) {
        case DBType.PROJECT_TITLE: {
            ret = "OnlineAss";
            break;
        }
        case DBType.USER_USERNAME: {
            ret = "PLACEHOLDER_USERNAME";
            break;
        }
        case DBType.ASSESSMENT_NAME: {
            ret = "PLACEHOLDER_ASSESSMENT";
            break;
        }
        case DBType.ASSESSMENT_ID: {
            ret = "abcdefgh";
            break;
        }
        case DBType.ASSESSMENT_DATE: {
            ret = "1/1/1970";
            break;
        }
        default: {
            ret = "ERROR_UNIMPLEMENTED_DBVAL";
            break;
        }
    }
    return ret;
}