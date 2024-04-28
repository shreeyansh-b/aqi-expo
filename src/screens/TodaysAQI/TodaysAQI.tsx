import React from "react";

import { H1, H2, Paragraph, Stack, View, XStack } from "tamagui";

type Props = {
  aqi: number | undefined;
  aqiCategory: {
    title: string;
    description: string;
    range: string;
    backgroundColor: string;
  };
};

const TodaysAQI = ({ aqi, aqiCategory }: Props) => {
  return (
    <View>
      <XStack>
        <H1
          style={{
            fontSize: 110,
            lineHeight: 130,
            fontWeight: 400,
          }}
          userSelect="none"
        >
          {aqi}
        </H1>
        <H2
          style={{
            fontWeight: 400,
            fontSize: 30,
          }}
          userSelect="none"
          marginLeft="auto"
          marginTop="auto"
          marginBottom={15}
        >
          {aqiCategory.title}
        </H2>
      </XStack>
      <Stack>
        <Paragraph fontStyle="italic">{aqiCategory.description}</Paragraph>
      </Stack>
    </View>
  );
};

export { TodaysAQI };
