const colors = {
  primary: '#3b3c7e',
  secondary: '#c5c5f1',
  white: '#ffffff',
  blue: 'blue',
  warning: '#FFC300',
  lightGray: 'lightgray',
};

const spacing = {
  small: 5,
  medium: 10,
  large: 20,
};

const fontSize = {
  small: 12,
  medium: 16,
  large: 20,
};

const commonHeaderStyles = {
  headerStyle: { backgroundColor: colors.primary},
  headerTintColor: colors.white,
};

const commonBottomTabStyles = {
  tabBarActiveTintColor: colors.warning,
  tabBarInactiveTintColor: colors.white,
  tabBarStyle: { backgroundColor: colors.primary },
  headerShown: false,
};

const commonStyles = {
  container: {
    flex: 1,
    flexDirection: 'column',
    padding: spacing.large,
    backgroundColor: colors.secondary,
  },

  subContaniner: {
    flexDirection: 'column',
  },

  itemListContainer: {
    flex: 1,
    padding: spacing.medium,
    flexDirection: 'row',
    padding: spacing.medium,
    backgroundColor: colors.primary,
    alignItems: 'center',
    borderRadius: 5,
    justifyContent: 'space-between',
    margin: spacing.medium,
  },

  itemDetailsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 5,
  },

  itemText: {
    color: colors.white,
    fontWeight: 'bold',
    fontSize: fontSize.medium,
  },

  itemDate: {
    color: colors.blue,
    backgroundColor: colors.white,
    padding: spacing.small,
    marginRight: spacing.medium,
  },

  itemValue: {
    color: colors.blue,
    backgroundColor: colors.white,
    padding: spacing.small,
  },

  text: {
    color: colors.primary,
    fontSize: fontSize.medium,
  },

  label: {
    marginBottom: spacing.small,
  },

  input: {
    backgroundColor: colors.lightGray,
    padding: spacing.medium,
    borderRadius: 5,
    marginBottom: spacing.large,
    borderWidth: 1,
  },

  descriptionInput: {
    backgroundColor: 'lightgray',
    padding: spacing.medium,
    borderRadius: 5,
    marginBottom: spacing.large,
    borderWidth: 1,
    height: 100,
  },

  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },

  activityContainer: {
    flexDirection: 'column',
    zIndex: 1000,
  },

  button: {
    padding: spacing.medium,
    borderRadius: 5,
  },
  
  icon: {
    marginRight: spacing.medium,
  },
};

export { colors, spacing, fontSize, commonStyles, commonHeaderStyles, commonBottomTabStyles };
