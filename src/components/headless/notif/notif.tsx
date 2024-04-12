import { Notification } from "@mantine/core"
import { showNotification } from "@mantine/notifications"

export default function NotificationItem({
  title,
  children,
  type,
}: {
  title: string
  children: string
  type: string
}) {
  if (type === "success") {
    showNotification({
      disallowClose: false,
      autoClose: 5000,
      title: title,
      message: children,

      styles: (theme) => ({
        root: {
          backgroundColor: theme.colors.white,
          borderColor: theme.colors.white,

          "&::before": { backgroundColor: theme.colors.green },
        },
        title: { color: theme.black },
        description: { color: theme.colors.gray[7] },
        closeButton: {
          color: theme.colors.black,
          // "&:hover": { backgroundColor: theme.colors.blue[7] },
        },
      }),
      loading: false,
    })
  } else if (type === "error") {
    showNotification({
      disallowClose: false,
      autoClose: 5000,
      title: title,
      message: children,

      styles: (theme) => ({
        root: {
          backgroundColor: theme.colors.white,
          borderColor: theme.colors.white,
          "&::before": { backgroundColor: theme.colors.red },
        },

        title: { color: theme.black },
        description: { color: theme.colors.gray[7] },
        closeButton: {
          color: theme.colors.black,
          // "&:hover": { backgroundColor: theme.colors.blue[7] },
        },
      }),
      loading: false,
    })
  }
}
