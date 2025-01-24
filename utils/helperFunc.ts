import { ACTIVITY_STATUS_NAMES, ACTIVITY_COLORS } from "./constants";

export function capitalizeFirstLetter(string: string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

export const getStatusColor = (isUser: boolean, activityStatus: string, participated: boolean) => {
    if (activityStatus === ACTIVITY_STATUS_NAMES.UPCOMING) {
        if (isUser) {
            if (participated) {
                return ACTIVITY_COLORS.BLUE;
            } else {
                return ACTIVITY_COLORS.GREEN; 
            }
        } else {
            return ACTIVITY_COLORS.YELLOW;
        }
    } else if (activityStatus === ACTIVITY_STATUS_NAMES.COMPLETED) {
        if (participated) {
            return ACTIVITY_COLORS.PURPLE;
        } else {
            return ACTIVITY_COLORS.GRAY;
        }
    }
    if (activityStatus === ACTIVITY_STATUS_NAMES.PENDING) return ACTIVITY_COLORS.NEUTRAL;
    return ACTIVITY_COLORS.NEUTRAL_DARK;
};

export const getStatusText = (isUser: boolean, activityStatus: string, participated: boolean) => {
    let statusText = activityStatus;
    if (activityStatus === ACTIVITY_STATUS_NAMES.UPCOMING) {
        if (isUser) {
            if (participated) {
                statusText = "joined";
            } else {
                statusText = "enroll";
            }
        } else {
            statusText = ACTIVITY_STATUS_NAMES.UPCOMING;
        }
    } else if (activityStatus === ACTIVITY_STATUS_NAMES.COMPLETED) {
        if (participated) {
            statusText = ACTIVITY_STATUS_NAMES.COMPLETED;
        } else {
            statusText = "ended";
        }
    }
    return capitalizeFirstLetter(statusText);
};

export const getBorderColor = (isUser: boolean, activityStatus: string, participated: boolean) => {
    if (activityStatus === ACTIVITY_STATUS_NAMES.UPCOMING) {
        if (isUser) {
            if (participated) {
                return ACTIVITY_COLORS.BORDER_BLUE;
            } else {
                return ACTIVITY_COLORS.BORDER_GREEN; 
            }
        } else {
            return ACTIVITY_COLORS.BORDER_YELLOW;
        }
    } else if (activityStatus === ACTIVITY_STATUS_NAMES.COMPLETED) {
        if (participated) {
            return ACTIVITY_COLORS.BORDER_PURPLE;
        } else {
            return ACTIVITY_COLORS.BORDER_GRAY;
        }
    }
    if (activityStatus === ACTIVITY_STATUS_NAMES.PENDING) return ACTIVITY_COLORS.BORDER_NEUTRAL;
    return ACTIVITY_COLORS.BORDER_NEUTRAL_DARK;
};