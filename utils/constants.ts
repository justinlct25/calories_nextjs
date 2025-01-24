export const ROLE_NAMES = {
    ADMIN: "admin",
    DONOR: "donor"
}

export const ACTIVITY_STATUS_NAMES = {
    PENDING: "pending",
    UPCOMING: "upcoming",
    ONGOING: "ongoing",
    PROCESSING: "processing",
    COMPLETED: "completed",
    POSTPONED: "postponed",
    RESCHEDULED: "rescheduled",
    CANCELLED: "cancelled"
}

export const ATTENDANCE_STATUS_NAMES = {
    ATTENDING: "attending",
    NOT_ATTENDING: "not attending",
    ATTENDED: "attended",
    ABSENT: "absent",
    INFORMED_ABSENT: "absent (informed)"
}

export const ACTIVITY_FILTER_STATUSES = {
    ALL: "all",
    UPCOMING: "upcoming",
    ENDED: "ended"
}

export const ACTIVITY_FILTER_STATUS_MAPPING = {
    ALL: [ACTIVITY_STATUS_NAMES.PENDING, ACTIVITY_STATUS_NAMES.UPCOMING, ACTIVITY_STATUS_NAMES.ONGOING, ACTIVITY_STATUS_NAMES.COMPLETED, ACTIVITY_STATUS_NAMES.CANCELLED, ACTIVITY_STATUS_NAMES.POSTPONED, ACTIVITY_STATUS_NAMES.RESCHEDULED],
    UPCOMING: [ACTIVITY_STATUS_NAMES.PENDING, ACTIVITY_STATUS_NAMES.UPCOMING, ACTIVITY_STATUS_NAMES.ONGOING, ACTIVITY_STATUS_NAMES.POSTPONED, ACTIVITY_STATUS_NAMES.RESCHEDULED],
    ENDED: [ACTIVITY_STATUS_NAMES.COMPLETED, ACTIVITY_STATUS_NAMES.CANCELLED]
}

export const ACTIVITY_COLORS = {
    BLUE: "bg-blue-800/70",
    GREEN: "bg-green-900/70",
    YELLOW: "bg-yellow-900/70",
    PURPLE: "bg-purple-800/70",
    GRAY: "bg-gray-900/70",
    NEUTRAL: "bg-neutral-900/70",
    NEUTRAL_DARK: "bg-neutral-900/90",
    BORDER_BLUE: "border-blue-800/70",
    BORDER_GREEN: "border-green-900/70",
    BORDER_YELLOW: "border-yellow-900/70",
    BORDER_PURPLE: "border-purple-800/70",
    BORDER_GRAY: "border-gray-900/70",
    BORDER_NEUTRAL: "border-neutral-900/70",
    BORDER_NEUTRAL_DARK: "border-neutral-900/90"
}