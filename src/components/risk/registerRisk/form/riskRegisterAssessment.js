import React from 'react';
import styles from '../../risk.module.css';

const riskRegisterAssessment = React.memo(() => {

    return (
        <section>
            <table className={styles.TableAlignCentre}>
                <tbody className={styles.TableHeadingText}>
                    <tr className="">
                        <td className=""></td>
                        <td className={[styles.TableAlignCentre, styles.TableXYLabelHeader].join(' ')} colSpan="5">Consequence</td>
                    </tr>
                    <tr className="">
                        <td className={[styles.TableXYLabelHeader, styles.AssessmentColumnWidth].join(' ')}>Likelihood</td>
                        <td className={[styles.TableXYLabel, styles.TableAlignCentre, styles.AssessmentColumnWidth].join(' ')}>Negligible</td>
                        <td className={[styles.TableXYLabel, styles.TableAlignCentre, styles.AssessmentColumnWidth].join(' ')}>Minor</td>
                        <td className={[styles.TableXYLabel, styles.TableAlignCentre, styles.AssessmentColumnWidth].join(' ')}>Moderate</td>
                        <td className={[styles.TableXYLabel, styles.TableAlignCentre, styles.AssessmentColumnWidth].join(' ')}>Major</td>
                        <td className={[styles.TableXYLabel, styles.TableAlignCentre, styles.AssessmentColumnWidth].join(' ')}>Catastrophic</td>
                    </tr>
                    <tr className="">
                        <td className={styles.TableXYLabel}>Almost certain</td>
                        <td className={["", styles.TableAlignCentre, styles.AssessmentColour3].join(' ')}><input type="radio" name="assessment" value="5" /></td>
                        <td className={["", styles.TableAlignCentre, styles.AssessmentColour4].join(' ')}><input type="radio" name="assessment" value="5" /></td>
                        <td className={["", styles.TableAlignCentre, styles.AssessmentColour5].join(' ')}><input type="radio" name="assessment" value="5" /></td>
                        <td className={["", styles.TableAlignCentre, styles.AssessmentColour6].join(' ')}><input type="radio" name="assessment" value="5" /></td>
                        <td className={["", styles.TableAlignCentre, styles.AssessmentColour6].join(' ')}><input type="radio" name="assessment" value="5" /></td>
                    </tr>
                    <tr className="">
                        <td className={styles.TableXYLabel}>Likely</td>
                        <td className={["", styles.TableAlignCentre, styles.AssessmentColour3].join(' ')}><input type="radio" name="assessment" value="5" /></td>
                        <td className={["", styles.TableAlignCentre, styles.AssessmentColour3].join(' ')}><input type="radio" name="assessment" value="5" /></td>
                        <td className={["", styles.TableAlignCentre, styles.AssessmentColour4].join(' ')}><input type="radio" name="assessment" value="5" /></td>
                        <td className={["", styles.TableAlignCentre, styles.AssessmentColour5].join(' ')}><input type="radio" name="assessment" value="5" /></td>
                        <td className={["", styles.TableAlignCentre, styles.AssessmentColour6].join(' ')}><input type="radio" name="assessment" value="5" /></td>
                    </tr>
                    <tr className="">
                        <td className={styles.TableXYLabel}>Possible</td>
                        <td className={["", styles.TableAlignCentre, styles.AssessmentColour2].join(' ')}><input type="radio" name="assessment" value="5" /></td>
                        <td className={["", styles.TableAlignCentre, styles.AssessmentColour3].join(' ')}><input type="radio" name="assessment" value="5" /></td>
                        <td className={["", styles.TableAlignCentre, styles.AssessmentColour3].join(' ')}><input type="radio" name="assessment" value="5" /></td>
                        <td className={["", styles.TableAlignCentre, styles.AssessmentColour4].join(' ')}><input type="radio" name="assessment" value="5" /></td>
                        <td className={["", styles.TableAlignCentre, styles.AssessmentColour5].join(' ')}><input type="radio" name="assessment" value="5" /></td>
                    </tr>
                    <tr className="">
                        <td className={styles.TableXYLabel}>Unlikely</td>
                        <td className={["", styles.TableAlignCentre, styles.AssessmentColour1].join(' ')}><input type="radio" name="assessment" value="5" /></td>
                        <td className={["", styles.TableAlignCentre, styles.AssessmentColour2].join(' ')}><input type="radio" name="assessment" value="5" /></td>
                        <td className={["", styles.TableAlignCentre, styles.AssessmentColour3].join(' ')}><input type="radio" name="assessment" value="5" /></td>
                        <td className={["", styles.TableAlignCentre, styles.AssessmentColour3].join(' ')}><input type="radio" name="assessment" value="5" /></td>
                        <td className={["", styles.TableAlignCentre, styles.AssessmentColour4].join(' ')}><input type="radio" name="assessment" value="5" /></td>
                    </tr>
                    <tr className="">
                        <td className={styles.TableXYLabel}>Rare</td>
                        <td className={["", styles.TableAlignCentre, styles.AssessmentColour1].join(' ')}><input type="radio" name="assessment" value="5" /></td>
                        <td className={["", styles.TableAlignCentre, styles.AssessmentColour1].join(' ')}><input type="radio" name="assessment" value="5" /></td>
                        <td className={["", styles.TableAlignCentre, styles.AssessmentColour2].join(' ')}><input type="radio" name="assessment" value="5" /></td>
                        <td className={["", styles.TableAlignCentre, styles.AssessmentColour3].join(' ')}><input type="radio" name="assessment" value="5" /></td>
                        <td className={["", styles.TableAlignCentre, styles.AssessmentColour3].join(' ')}><input type="radio" name="assessment" value="5" /></td>
                    </tr>
                </tbody>
            </table>
        </section>
    );
});

export default riskRegisterAssessment;