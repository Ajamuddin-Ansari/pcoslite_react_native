import React, { useEffect, useState } from "react";
import { StyleSheet, ActivityIndicator } from "react-native";
import { Overlay } from "react-native-elements";
import { primary } from "../../lib/colors";

const Loader = ({ showHud }) => {
  const [showLoader, setShowLoader] = useState(showHud);

  useEffect(() => {
    setShowLoader(showHud);
  }, [showHud]);

  return (
    <Overlay
      isVisible={showLoader}
      overlayStyle={styles.hudOverlayStyle}
      backgroundColor="transparent"
    >
      <ActivityIndicator color={primary} size="large" />
    </Overlay>
  );
};

Loader.defaultProps = {
  loaderColor: primary,
};

const styles = StyleSheet.create({
  hudOverlayStyle: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    width: 70,
    height: 70,
  },
  loaderImage: {
    width: 50,
    height: 50,
  },
});

export default Loader;
