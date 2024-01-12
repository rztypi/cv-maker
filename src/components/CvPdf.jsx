import {
  Page,
  Text,
  Link,
  View,
  Document,
  StyleSheet,
  Font,
  Svg,
  Line,
} from "@react-pdf/renderer";
import { Fragment } from "react";

Font.register({
  family: "Garamond",
  fonts: [
    { src: "src/assets/EBGaramond-Regular.ttf" },
    { src: "src/assets/EBGaramond-Italic.ttf", fontStyle: "italic" },
    { src: "src/assets/EBGaramond-Bold.ttf", fontWeight: 700 },
  ],
});

const styles = StyleSheet.create({
  page: {
    fontFamily: "Garamond",
    fontSize: 12,
    padding: "0.5in",
    lineHeight: 1.05,
  },
  genInfo: {
    lineHeight: 1.15,
  },
  name: {
    fontWeight: "bold",
    fontSize: 26,
  },
  details: {
    fontSize: 16,
  },
  bold: {
    fontWeight: "bold",
  },
  italic: {
    fontStyle: "italic",
  },
  itemBoldHeader: {
    fontWeight: "bold",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  itemItalicHeader: {
    fontStyle: "italic",
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

function Hr() {
  return (
    <Svg height="1" width="540" style={{ marginVertical: 4.5 }}>
      <Line x1="0" y1="0" x2="540" y2="0" strokeWidth={1} stroke="#000" />
    </Svg>
  );
}

function Br({ size = 12 }) {
  return <Text style={{ fontSize: size }}>{"\n"}</Text>;
}

function BulletItem({ children }) {
  return (
    <View
      style={{
        flexDirection: "row",
      }}
    >
      <Text
        style={{
          marginRight: 12,
        }}
      >
        &bull;
      </Text>
      <Text>{children}</Text>
    </View>
  );
}

function Section({ title, children }) {
  return (
    <View>
      <Br />
      <Text style={styles.bold}>{title.toUpperCase()}</Text>
      <Hr />
      {children}
    </View>
  );
}

function GenInfo({ name, email, phone, address, links }) {
  const mappedLinks = links.map((linkObj, index) => (
    <Fragment key={linkObj.key}>
      <Link src={linkObj.linkRef}>{linkObj.linkName}</Link>
      {index < links.length - 1 && " | "}
    </Fragment>
  ));
  const detailsArray = [email, phone, address].filter((item) => !!item);

  return (
    <View style={styles.genInfo}>
      <Text style={styles.name}>{name}</Text>
      <Text style={styles.details}>
        {detailsArray.join(" | ")}
        {detailsArray.length > 0 && mappedLinks.length > 0 && " | "}
        {mappedLinks}
      </Text>
      <Hr />
    </View>
  );
}

function WorkItem({
  isNotLast,
  name,
  startMonth,
  startYear,
  endMonth,
  endYear,
  title,
  address,
  details,
}) {
  return (
    <View>
      <View style={styles.itemBoldHeader}>
        <Text>{name}</Text>
        <Text>
          {startMonth} {startYear} - {endMonth} {endYear}
        </Text>
      </View>
      <View style={styles.itemItalicHeader}>
        <Text>{title}</Text>
        <Text>{address}</Text>
      </View>
      {details.map((detail) => (
        <BulletItem key={detail.key}>{detail.text}</BulletItem>
      ))}
      {isNotLast && <Br />}
    </View>
  );
}

function EducationItem({
  isNotLast,
  name,
  month,
  year,
  degree,
  address,
  details,
}) {
  return (
    <View>
      <View style={styles.itemBoldHeader}>
        <Text>{name}</Text>
        <Text>
          {month} {year}
        </Text>
      </View>
      <View style={styles.itemItalicHeader}>
        <Text>{degree}</Text>
        <Text>{address}</Text>
      </View>
      {details.map((detail) => (
        <BulletItem key={detail.key}>{detail.text}</BulletItem>
      ))}
      {isNotLast && <Br />}
    </View>
  );
}

function SectionItem({ type, text }) {
  if (type === "heading") {
    return <Text style={styles.bold}>{text}</Text>;
  } else if (type === "item") {
    return <BulletItem>{text}</BulletItem>;
  }
}

function CvPdf({ cvData }) {
  return (
    <Document>
      <Page size="LETTER" style={styles.page}>
        <GenInfo
          name={cvData.name}
          email={cvData.email}
          phone={cvData.phone}
          address={cvData.address}
          links={cvData.links}
        ></GenInfo>
        {cvData.work.length > 0 && (
          <Section title="work experience">
            {cvData.work.map((item, index) => (
              <WorkItem
                key={item.key}
                isNotLast={index < cvData.work.length - 1}
                {...item}
              />
            ))}
          </Section>
        )}
        {cvData.education.length > 0 && (
          <Section title="education">
            {cvData.education.map((item, index) => (
              <EducationItem
                key={item.key}
                isNotLast={index < cvData.education.length - 1}
                {...item}
              />
            ))}
          </Section>
        )}
        {cvData.sections.map((section) => (
          <Section key={section.key} title={section.title}>
            {section.content.map((content) => (
              <SectionItem key={content.key} {...content}></SectionItem>
            ))}
          </Section>
        ))}
      </Page>
    </Document>
  );
}

export default CvPdf;
