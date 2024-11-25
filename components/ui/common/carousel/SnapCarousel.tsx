import { View, FlatList, NativeSyntheticEvent, NativeScrollEvent, useWindowDimensions } from "react-native";
import { useEffect } from "react";
import { SnapCarouselItem } from "./SnapCarouselItem";

interface SnapCarouselProps {
    dataOptions: number[];
    flatListRef: React.RefObject<FlatList>;
    selectedOption: number;
    setSelectedOption: (option: number) => void;
    initialPosition?: "start" | "center" | "end";
    initialIndex?: number;
}

export const SnapCarousel = ({
    dataOptions,
    flatListRef,
    selectedOption,
    setSelectedOption,
    initialPosition = "start",
    initialIndex = 0,
}: SnapCarouselProps) => {
    const { height } = useWindowDimensions();
    const ITEM_HEIGHT = height / 6;

    useEffect(() => {
        // Calcula el índice inicial basado en la posición deseada
        if (initialPosition === "center") {
            initialIndex = Math.floor(dataOptions.length / 2);
        } else if (initialPosition === "end") {
            initialIndex = dataOptions.length - 1;
        }

        // Desplazamiento inicial animado
        if (flatListRef.current) {
            (flatListRef.current as FlatList).scrollToOffset({
                offset: initialIndex * ITEM_HEIGHT,
                animated: true, // Anima el desplazamiento inicial
            });
            setSelectedOption(dataOptions[initialIndex]);
        }
    }, []);

    const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
        const offsetY = event.nativeEvent.contentOffset.y;
        const centeredIndex = Math.round(offsetY / ITEM_HEIGHT);
        setSelectedOption(dataOptions[centeredIndex]);
    };

    const renderItem = ({ item }: { item: number }) => {
        const isFocused = item === selectedOption;
        return <SnapCarouselItem item={item} isFocused={isFocused} ITEM_HEIGHT={ITEM_HEIGHT} />;
    };

    return (
        <FlatList
            className="w-full h-3/5"
            ref={flatListRef}
            data={dataOptions}
            keyExtractor={(item) => item.toString()}
            renderItem={renderItem}
            getItemLayout={(data, index) => ({
                length: ITEM_HEIGHT,
                offset: ITEM_HEIGHT * index,
                index,
            })}
            initialNumToRender={10}
            maxToRenderPerBatch={5}
            snapToInterval={ITEM_HEIGHT}
            decelerationRate={0.7}
            showsVerticalScrollIndicator={false}
            onScroll={handleScroll}
            scrollEventThrottle={16}
            ListFooterComponent={<View style={{ height: ITEM_HEIGHT * 2 }} />}
        />
    );
};
