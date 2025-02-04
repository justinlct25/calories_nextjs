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

export const getDateString = (startAt: string, endAt: string): string => {
    const startAtDate = new Date(startAt);
    const endAtDate = new Date(endAt);

    const formatDate = (date: Date): string => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    const startAtFormatted = formatDate(startAtDate);
    const endAtFormatted = formatDate(endAtDate);

    let formattedDate = '';
    if (startAtFormatted === formatDate(new Date())) {
        formattedDate = 'Today';
    } else if (startAtFormatted === endAtFormatted) {
        formattedDate = startAtFormatted;
    } else {
        formattedDate = `${startAtFormatted} - ${endAtFormatted}`;
    }
    return formattedDate;
};

export const getTimeString = (startAt: string, endAt: string): string => {
    const startAtDate = new Date(startAt);
    const endAtDate = new Date(endAt);

    const formatTime = (date: Date): string => {
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        return `${hours}:${minutes}`;
    };

    const startAtFormatted = formatTime(startAtDate);
    const endAtFormatted = formatTime(endAtDate);

    if (startAtDate.toDateString() === endAtDate.toDateString()) {
        return `${startAtFormatted} - ${endAtFormatted}`;
    }
    return `${startAtFormatted}`;
};

export const htmlProcessBlankLines = (html: string): string => {
    return html.replace(/<p style="text-align: center"><\/p>/g, '<p>&nbsp;</p>');
}