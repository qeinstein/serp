package com.serp.service;

import com.serp.model.SerpPaper;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Service
public class PaperDatasetService {

    private final List<SerpPaper> crimeReportingPapers = new ArrayList<>();
    private final List<SerpPaper> deepLearningPapers = new ArrayList<>();

    public PaperDatasetService() {
        initCrimeReportingDataset();
        initDeepLearningDataset();
    }

    private void initCrimeReportingDataset() {
        crimeReportingPapers.add(new SerpPaper(
            "CR-01",
            "CrimeStat IV: Spatial Statistics Program for Analyzing Crime Incident Locations",
            "Ned Levine et al.",
            2015,
            "National Institute of Justice Research",
            "CRIME_REPORTING",
            "Presents spatial point pattern analysis, kernel density spatial hotspot estimation, and nearest neighbor hierarchical clustering for regional law enforcement analytics.",
            Arrays.asList("GIS Spatial Mapping & Hotspot Visualization", "Spatial-Temporal Density Estimation", "Geographic Information Systems (GIS) Integration", "Statistical Crime Forecasting"),
            "https://doi.org/10.1037/e527012012-001"
        ));

        crimeReportingPapers.add(new SerpPaper(
            "CR-02",
            "PredPol: Real-time Predictive Policing Algorithm for Crime Prevention",
            "George Mohler et al.",
            2014,
            "Journal of the American Statistical Association",
            "CRIME_REPORTING",
            "Uses self-exciting point process model (Hawkes Process) to predict locations of near-repeat burglaries and violent crimes in real time.",
            Arrays.asList("Predictive Hotspot & Temporal Analytics", "Real-Time Alert Dispatch", "Statistical Crime Forecasting", "Incident Categorization & Classification"),
            "https://doi.org/10.1080/01621459.2014.889978"
        ));

        crimeReportingPapers.add(new SerpPaper(
            "CR-03",
            "SafeCity: Web-Based Anonymous Crime Reporting & Multi-Agency Dispatch",
            "Amir H. Alavi & Elena V. Chen",
            2019,
            "IEEE Transactions on Information Forensics and Security",
            "CRIME_REPORTING",
            "Presents an encrypted web and mobile reporting portal with zero-knowledge anonymous tip submission, geolocation tagging, and automated multi-agency dispatching.",
            Arrays.asList("Anonymous Tip Submission & Privacy Shield", "GIS Spatial Mapping & Hotspot Visualization", "Real-Time Alert Dispatch", "Multi-Agency Interoperability Protocol", "Mobile Field Incident Logging"),
            "https://doi.org/10.1109/TIFS.2019.2908871"
        ));

        crimeReportingPapers.add(new SerpPaper(
            "CR-04",
            "CrimeNLP: Automated Victimology Classification and Incident Entity Extraction",
            "Sarah Jenkins & Rajat Kumar",
            2021,
            "ACM Transactions on Knowledge Discovery from Data",
            "CRIME_REPORTING",
            "Applies Transformer NLP models to parse unstructured free-text crime reports, extract suspect descriptions, modus operandi (MO), and victimology features.",
            Arrays.asList("Automated NLP Victimology & Narrative Mining", "Incident Categorization & Classification", "Automated Suspect & Modus Operandi Re-Identification", "Evidence & Multimedia Attachment Vault"),
            "https://doi.org/10.1145/3412345"
        ));

        crimeReportingPapers.add(new SerpPaper(
            "CR-05",
            "UrbanShield: Smart City Mobile Field Incident Logging and GIS Dispatch",
            "Marcus Thorne & Lucia Rossi",
            2020,
            "Computers, Environment and Urban Systems",
            "CRIME_REPORTING",
            "Introduces mobile offline-first field reporting app with encrypted multimedia upload, Bluetooth beacon officer tracking, and dynamic heatmapping.",
            Arrays.asList("Mobile Field Incident Logging", "GIS Spatial Mapping & Hotspot Visualization", "Evidence & Multimedia Attachment Vault", "Real-Time Alert Dispatch", "Audit Trail & Digital Chain-of-Custody"),
            "https://doi.org/10.1016/j.compenvurbsys.2020.101450"
        ));

        crimeReportingPapers.add(new SerpPaper(
            "CR-06",
            "ChainGuard: Blockchain-based Chain-of-Custody for Digital Crime Evidence",
            "Dimitri Petrov & Fatima Al-Mansoor",
            2022,
            "IEEE Access",
            "CRIME_REPORTING",
            "Implementation of an immutable ledger to track physical and digital forensic evidence from victim report submission through judicial trial.",
            Arrays.asList("Audit Trail & Digital Chain-of-Custody", "Evidence & Multimedia Attachment Vault", "Anonymous Tip Submission & Privacy Shield", "Multi-Agency Interoperability Protocol"),
            "https://doi.org/10.1109/ACCESS.2022.3150000"
        ));

        crimeReportingPapers.add(new SerpPaper(
            "CR-07",
            "SentriNet: Multi-Agency Interoperable Crime Data Exchange Framework",
            "Kwang-Soo Park & David Miller",
            2018,
            "Government Information Quarterly",
            "CRIME_REPORTING",
            "Proposes NIEM-compliant federal, state, and local law enforcement database federation for real-time criminal history matching and alert distribution.",
            Arrays.asList("Multi-Agency Interoperability Protocol", "Real-Time Alert Dispatch", "Incident Categorization & Classification", "Automated Suspect & Modus Operandi Re-Identification"),
            "https://doi.org/10.1016/j.giq.2018.04.002"
        ));

        crimeReportingPapers.add(new SerpPaper(
            "CR-08",
            "SpatioTemporal-Mapper: Deep Spatial-Temporal Density Estimation for Urban Crime",
            "Ying Zhang & Carlos Gomez",
            2023,
            "Information Sciences",
            "CRIME_REPORTING",
            "Combines LSTM networks and kernel density estimation to model micro-time crime waves across metropolitan transit corridors.",
            Arrays.asList("Spatial-Temporal Density Estimation", "Predictive Hotspot & Temporal Analytics", "GIS Spatial Mapping & Hotspot Visualization", "Statistical Crime Forecasting"),
            "https://doi.org/10.1016/j.ins.2023.01.089"
        ));

        crimeReportingPapers.add(new SerpPaper(
            "CR-09",
            "AnonTip: Privacy-Preserving Zero-Knowledge Crime Reporting Platform",
            "Xavier Moreau & Jean-Luc Picard",
            2021,
            "Journal of Cybersecurity",
            "CRIME_REPORTING",
            "Focuses on zk-SNARK cryptographic primitives allowing citizens to prove crime report authenticity without revealing identity or IP metadata.",
            Arrays.asList("Anonymous Tip Submission & Privacy Shield", "Audit Trail & Digital Chain-of-Custody", "Evidence & Multimedia Attachment Vault", "Mobile Field Incident Logging"),
            "https://doi.org/10.1093/cybsec/tyab012"
        ));

        crimeReportingPapers.add(new SerpPaper(
            "CR-10",
            "CopTrack: Automated Suspect Identification and Modus Operandi Matching System",
            "Brian O'Connor & Kenji Tanaka",
            2017,
            "Pattern Recognition Letters",
            "CRIME_REPORTING",
            "Uses graph similarity matching on crime incident reports to link series of unsolved burglaries to single offender profiles.",
            Arrays.asList("Automated Suspect & Modus Operandi Re-Identification", "Incident Categorization & Classification", "Automated NLP Victimology & Narrative Mining", "Multi-Agency Interoperability Protocol"),
            "https://doi.org/10.1016/j.patrec.2017.09.015"
        ));
    }

    private void initDeepLearningDataset() {
        deepLearningPapers.add(new SerpPaper(
            "DL-01",
            "Attention Is All You Need: Modern Transformer Architectures in Deep Learning",
            "Ashish Vaswani et al.",
            2017,
            "Advances in Neural Information Processing Systems (NeurIPS)",
            "DEEP_LEARNING",
            "Introduces the Transformer architecture relying entirely on multi-head self-attention mechanisms without recurrent or convolutional neural layers.",
            Arrays.asList("Abstract", "Introduction & Motivation", "Transformer & Multi-Head Self-Attention Architecture", "Loss Function Formulation & Optimization", "Experimental Setup & Benchmarking", "Ablation Study & Sensitivity Analysis", "Conclusion & Future Work"),
            "https://arxiv.org/abs/1706.03762"
        ));

        deepLearningPapers.add(new SerpPaper(
            "DL-02",
            "Deep Residual Learning for Image Recognition (ResNet)",
            "Kaiming He, Xiangyu Zhang, Shaoqing Ren, Jian Sun",
            2016,
            "IEEE Conference on Computer Vision and Pattern Recognition (CVPR)",
            "DEEP_LEARNING",
            "Presents residual learning frameworks to ease the training of networks that are substantially deeper than those previously used.",
            Arrays.asList("Abstract", "Introduction", "Related Work", "Deep Residual Learning Framework", "Convolutional Neural Network Architecture", "Gradient Vanishing & Optimization Dynamics", "Experimental Benchmarks on ImageNet", "Ablation Study & Sensitivity Analysis", "Conclusion"),
            "https://arxiv.org/abs/1512.03385"
        ));

        deepLearningPapers.add(new SerpPaper(
            "DL-03",
            "BERT: Pre-training of Deep Bidirectional Transformers for Language Understanding",
            "Jacob Devlin, Ming-Wei Chang, Kenton Lee, Kristina Toutanova",
            2019,
            "NAACL-HLT 2019",
            "DEEP_LEARNING",
            "Introduces BERT designed to pre-train deep bidirectional representations from unlabeled text by jointly conditioning on left and right context.",
            Arrays.asList("Abstract", "Introduction", "Related Work", "BERT Model Architecture & Pre-training", "Transformer & Multi-Head Self-Attention Architecture", "Transfer Learning & Fine-Tuning Protocols", "Data Augmentation & Preprocessing Strategies", "Hyperparameter Tuning & Grid Search", "Ablation Study & Sensitivity Analysis", "Conclusion"),
            "https://arxiv.org/abs/1810.04805"
        ));

        deepLearningPapers.add(new SerpPaper(
            "DL-04",
            "Mastering the Game of Go with Deep Neural Networks and Tree Search (AlphaGo)",
            "David Silver et al.",
            2016,
            "Nature",
            "DEEP_LEARNING",
            "Combines value networks and policy networks with Monte Carlo Tree Search to evaluate positions and select moves in Go.",
            Arrays.asList("Abstract", "Introduction", "Reinforcement Learning & Policy Gradient Formulation", "Loss Function Formulation & Optimization", "Computational Complexity & FLOPs Analysis", "Experimental Setup & Benchmarking", "Conclusion"),
            "https://doi.org/10.1038/nature16961"
        ));

        deepLearningPapers.add(new SerpPaper(
            "DL-05",
            "Quantizing Deep Neural Networks for Efficient Edge Inference",
            "Song Han, Huizi Mao, William J. Dally",
            2016,
            "International Conference on Learning Representations (ICLR)",
            "DEEP_LEARNING",
            "Presents Deep Compression: pruning redundant connections, trained quantization, and Huffman coding to reduce storage requirements 35x to 49x.",
            Arrays.asList("Abstract", "Introduction", "Related Work", "Model Quantization & Edge Deployment", "Computational Complexity & FLOPs Analysis", "Hyperparameter Tuning & Grid Search", "Experimental Setup & Benchmarking", "Conclusion"),
            "https://arxiv.org/abs/1510.00149"
        ));

        deepLearningPapers.add(new SerpPaper(
            "DL-06",
            "Adam: A Method for Stochastic Optimization",
            "Diederik P. Kingma & Jimmy Ba",
            2015,
            "ICLR 2015",
            "DEEP_LEARNING",
            "Presents Adam, an algorithm for first-order gradient-based optimization of stochastic objective functions, based on adaptive estimates of lower-order moments.",
            Arrays.asList("Abstract", "Introduction", "Algorithm & Derivation", "Loss Function Formulation & Optimization", "Gradient Vanishing & Optimization Dynamics", "Hyperparameter Tuning & Grid Search", "Experimental Benchmarks on ImageNet", "Conclusion"),
            "https://arxiv.org/abs/1412.6980"
        ));

        deepLearningPapers.add(new SerpPaper(
            "DL-07",
            "Generative Adversarial Nets (GANs)",
            "Ian Goodfellow et al.",
            2014,
            "NeurIPS 2014",
            "DEEP_LEARNING",
            "Proposes a new framework for estimating generative models via an adversarial process in which two models are simultaneously trained.",
            Arrays.asList("Abstract", "Introduction", "Adversarial Nets Framework", "Loss Function Formulation & Optimization", "Data Augmentation & Preprocessing Strategies", "Experimental Setup & Benchmarking", "Theoretical Results & Proofs", "Conclusion"),
            "https://arxiv.org/abs/1406.2661"
        ));

        deepLearningPapers.add(new SerpPaper(
            "DL-08",
            "Vision Transformers (ViT): An Image is Worth 16x16 Words",
            "Alexey Dosovitskiy et al.",
            2021,
            "ICLR 2021",
            "DEEP_LEARNING",
            "Shows that a pure Transformer applied directly to sequences of image patches can perform very well on image classification tasks.",
            Arrays.asList("Abstract", "Introduction", "Related Work", "Transformer & Multi-Head Self-Attention Architecture", "Convolutional Neural Network Architecture", "Transfer Learning & Fine-Tuning Protocols", "Computational Complexity & FLOPs Analysis", "Ablation Study & Sensitivity Analysis", "Conclusion"),
            "https://arxiv.org/abs/2010.11929"
        ));
    }

    public List<SerpPaper> getCrimeReportingPapers() {
        return crimeReportingPapers;
    }

    public List<SerpPaper> getDeepLearningPapers() {
        return deepLearningPapers;
    }

    public List<SerpPaper> getAllPapers() {
        List<SerpPaper> all = new ArrayList<>(crimeReportingPapers);
        all.addAll(deepLearningPapers);
        return all;
    }
}
