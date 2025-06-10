import React, { useRef, useEffect, useState } from "react";
import { FlatList, Image, View, Dimensions, Text } from "react-native";

const { width } = Dimensions.get("window");

const ImageCarousel = ({ images, height = 200 }) => {
  const flatListRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      const nextIndex = (currentIndex + 1) % images.length;
      flatListRef.current?.scrollToIndex({ index: nextIndex, animated: true });
      setCurrentIndex(nextIndex);
    }, 4000); 

    return () => clearInterval(interval);
  }, [currentIndex]);

  const renderItem = ({ item }) => (
    <Image
      source={{ uri: item }}
      style={{ width, height, resizeMode: "cover" }}
    />
  );

  const renderPagination = () => (
    <View style={styles.paginationContainer}>
      {images.map((_, index) => (
        <View
          key={index}
          style={[
            styles.paginationDot,
            currentIndex === index && styles.activeDot,
          ]}
        />
      ))}
    </View>
  );

  return (
    <View>
      <FlatList
        ref={flatListRef}
        data={images}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        onScrollToIndexFailed={() => {}}
        onMomentumScrollEnd={(e) => {
          const contentOffsetX = e.nativeEvent.contentOffset.x;
          const index = Math.floor(contentOffsetX / width);
          setCurrentIndex(index);
        }}
      />
      {renderPagination()}
    </View>
  );
};

const styles = {
  paginationContainer: {
    position: "absolute",
    bottom: 10,
    left: 0,
    right: 0,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#ddd",
    margin: 5,
  },
  activeDot: {
    backgroundColor: "#6200ee",
  },
};

export default ImageCarousel;
