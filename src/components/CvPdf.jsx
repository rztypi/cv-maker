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
  section: {},
  bold: {
    fontWeight: "bold",
  },
  italic: {
    fontStyle: "italic",
  },
  workItem: {},
  workHeader: {
    flexDirection: "row",
  },
  workHeaderColumn1: {
    flexGrow: 2,
  },
  workHeaderColumn2: {
    flexGrow: 1,
    alignItems: "flex-end",
  },
  workName: {
    fontWeight: "bold",
  },
  workDate: {
    fontWeight: "bold",
  },
  workTitle: {
    fontStyle: "italic",
  },
  workAddress: {
    fontStyle: "italic",
  },
  educationItem: {},
  educationHeader: {
    flexDirection: "row",
  },
  educationHeaderColumn1: {
    flexGrow: 2,
  },
  educationHeaderColumn2: {
    flexGrow: 1,
    alignItems: "flex-end",
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

function BulletItem({ text }) {
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
      <Text>{text}</Text>
    </View>
  );
}

function Section({ title, children }) {
  return (
    <View style={styles.section}>
      <Br />
      <Text style={styles.bold}>{title}</Text>
      <Hr />
      {children}
    </View>
  );
}

function GenInfo({ name, email, phone, address, links }) {
  const mappedLinks = links.map((link, index) => (
    <>
      <Link key={link.key} src={link.linkRef}>
        {link.linkName}
      </Link>
      {index < links.length - 1 && " | "}
    </>
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
    <View style={styles.workItem}>
      <View style={styles.workHeader}>
        <View style={styles.workHeaderColumn1}>
          <Text style={styles.workName}>{name}</Text>
          <Text style={styles.workTitle}>{title}</Text>
        </View>
        <View style={styles.workHeaderColumn2}>
          <Text style={styles.workName}>
            {startMonth} {startYear} - {endMonth} {endYear}
          </Text>
          <Text style={styles.workAddress}>{address}</Text>
        </View>
      </View>
      {details.map((detail) => (
        <BulletItem key={detail.key} text={detail.text} />
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
    <View style={styles.educationItem}>
      <View style={styles.educationHeader}>
        <View style={styles.educationHeaderColumn1}>
          <Text style={styles.bold}>{name}</Text>
          <Text style={styles.italic}>{degree}</Text>
        </View>
        <View style={styles.educationHeaderColumn2}>
          <Text style={styles.bold}>
            {month} {year}
          </Text>
          <Text style={styles.italic}>{address}</Text>
        </View>
      </View>
      {details.map((detail) => (
        <BulletItem key={detail.key} text={detail.text} />
      ))}
      {isNotLast && <Br />}
    </View>
  );
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
        <Section title="WORK EXPERIENCE">
          {cvData.work.map((item, index) => (
            <WorkItem
              key={item.key}
              isNotLast={index < cvData.work.length - 1}
              {...item}
            />
          ))}
        </Section>
        <Section title="EDUCATION">
          {cvData.education.map((item, index) => (
            <EducationItem
              key={item.key}
              isNotLast={index < cvData.education.length - 1}
              {...item}
            />
          ))}
        </Section>
      </Page>
    </Document>
  );
}

export default CvPdf;
