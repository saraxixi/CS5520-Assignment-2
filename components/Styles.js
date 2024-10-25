const colors = {
  primary: '#3b3c7e',
  light: '#c5c5f1',
  dark: '#5b5cb5',
  white: '#ffffff',
  blue: 'blue',
  warning: '#FFC300',
  lightGray: 'lightgray',
  black: 'black',
  red: 'red',
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
  lightContainer: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: colors.light,
    padding: spacing.large,
  },

  darkContainer: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: colors.dark,
    padding: spacing.large,
  },

  subContaniner: {
    flexDirection: 'column',
  },

  itemListContainer: {
    flex: 1,
    padding: spacing.medium,
    flexDirection: 'row',
    backgroundColor: colors.primary,
    alignItems: 'center',
    borderRadius: 5,
    justifyContent: 'space-between',
    marginBottom: spacing.medium,
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
    fontWeight: 'bold',
  },

  itemValue: {
    color: colors.blue,
    backgroundColor: colors.white,
    padding: spacing.small,
    fontWeight: 'bold',
  },

  text: {
    color: colors.primary,
    fontSize: fontSize.medium,
  },

  lightLabel: {
    color: colors.black,
    marginBottom: spacing.small,
  },

  darkLabel: {
    color: colors.white,
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
    textAlignVertical: 'top',
    height: 100,
  },

  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: spacing.large,
  },

  activityContainer: {
    flexDirection: 'column',
    zIndex: 1000,
  },

  themeButtonContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  
  button: {
    padding: spacing.medium,
    borderRadius: 5,
  },
  
  icon: {
    marginRight: spacing.medium,
  },

  headerButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: spacing.medium,
  },

  buttonText: {
    color: colors.white,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  
};

export { colors, spacing, fontSize, commonStyles, commonHeaderStyles, commonBottomTabStyles };
