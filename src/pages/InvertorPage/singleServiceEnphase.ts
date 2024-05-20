import {
  IndividualService,
  ServiceSpecific,
} from "../../components/Calculator/calculator-types";

export const enphaseServices: IndividualService[] = [
  {
    title: "RELAY-3P",
    description: "(накопители фотоэлектричества)",
    price: 180,
    specific: ServiceSpecific.Single,
  },
  {
    title: "IQ-Kabel (1m / 3-phasig) Q-25-17-3P-240",
    description: "(накопители фотоэлектричества)",
    price: 40,
    specific: ServiceSpecific.Single,
  },
  {
    title: "Abschlusskappen Q-TERM-3P-10",
    description: "(накопители фотоэлектричества)",
    price: 25,
    specific: ServiceSpecific.Single,
  },
  {
    title: "IQ-Siegel Q-SEAL-10",
    description: "(накопители фотоэлектричества)",
    price: 8,
    specific: ServiceSpecific.Single,
  },
  {
    title: "Ort verkabelbar Q-CONN-3P-10F",
    description: "(buchse)",
    price: 28,
    specific: ServiceSpecific.Single,
  },
  {
    title: "Ort verkabelbar Q-CONN-3P-10M",
    description: "(männlich)",
    price: 28,
    specific: ServiceSpecific.Single,
  },
  {
    title: "Ronkabel Q-25-RAW - 3P-300",
    description: "(за метр)",
    price: 12,
    specific: ServiceSpecific.Single,
  },
  {
    title: "IQ-Clips ET-CLIP-100",
    description: "(за метр)",
    price: 2,
    specific: ServiceSpecific.Single,
  },
  {
    title: "Trennwerkzeug (3-phasig) Q-DISC-3P-10",
    description: "(за метр)",
    price: 8,
    specific: ServiceSpecific.Single,
  },
];
