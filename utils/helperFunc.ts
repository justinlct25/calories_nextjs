import { ACTIVITY_STATUS_NAMES, ACTIVITY_COLORS } from "./constants";
import { format } from 'date-fns';


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

export const getDateString = (startAt: string, endAt: string): string => {
        const startAtDate = format(new Date(startAt), 'yyyy-MM-dd');
        const endAtDate = format(new Date(endAt), 'yyyy-MM-dd');
        let formattedDate = '';
        if (startAtDate === format(new Date(), 'yyyy-MM-dd')) {
            formattedDate = 'Today';
        } else if (startAtDate === endAtDate) {
            formattedDate = startAtDate;
        } else {
            formattedDate = `${startAtDate} - ${endAtDate}`;
        }
        return formattedDate;
    }

export const getTimeString = (startAt: string, endAt: string): string => {
    const startAtDate = format(new Date(startAt), 'yyyy-MM-dd');
    const endAtDate = format(new Date(endAt), 'yyyy-MM-dd');
    const formattedStartAt = format(new Date(startAt), 'HH:mm');
    const formattedEndAt = format(new Date(endAt), 'HH:mm');
    if (startAtDate == endAtDate) return `${formattedStartAt} - ${formattedEndAt}`;
    return `${formattedStartAt}`;
}

export const htmlProcessBlankLines = (html: string): string => {
    return html.replace(/<p style="text-align: center"><\/p>/g, '<p>&nbsp;</p>');
}