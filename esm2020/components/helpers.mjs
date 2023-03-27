/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
export function convertToBoolProperty(val) {
    if (typeof val === 'string') {
        val = val.toLowerCase().trim();
        return val === 'true' || val === '';
    }
    return !!val;
}
export function getElementHeight(el) {
    /**
     *
     * TODO: Move helpers in separate common module.
     * TODO: Provide window through di token.
     * */
    const style = window.getComputedStyle(el);
    const marginTop = parseInt(style.getPropertyValue('margin-top'), 10);
    const marginBottom = parseInt(style.getPropertyValue('margin-bottom'), 10);
    return el.offsetHeight + marginTop + marginBottom;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGVscGVycy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9mcmFtZXdvcmsvdGhlbWUvY29tcG9uZW50cy9oZWxwZXJzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFLSCxNQUFNLFVBQVUscUJBQXFCLENBQUMsR0FBUTtJQUM1QyxJQUFJLE9BQU8sR0FBRyxLQUFLLFFBQVEsRUFBRTtRQUMzQixHQUFHLEdBQUcsR0FBRyxDQUFDLFdBQVcsRUFBRSxDQUFDLElBQUksRUFBRSxDQUFDO1FBRS9CLE9BQU8sR0FBRyxLQUFLLE1BQU0sSUFBSSxHQUFHLEtBQUssRUFBRSxDQUFDO0tBQ3JDO0lBRUQsT0FBTyxDQUFDLENBQUMsR0FBRyxDQUFDO0FBQ2YsQ0FBQztBQUVELE1BQU0sVUFBVSxnQkFBZ0IsQ0FBQyxFQUFFO0lBQ2pDOzs7O1NBSUs7SUFDTCxNQUFNLEtBQUssR0FBRyxNQUFNLENBQUMsZ0JBQWdCLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDMUMsTUFBTSxTQUFTLEdBQUcsUUFBUSxDQUFDLEtBQUssQ0FBQyxnQkFBZ0IsQ0FBQyxZQUFZLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQztJQUNyRSxNQUFNLFlBQVksR0FBRyxRQUFRLENBQUMsS0FBSyxDQUFDLGdCQUFnQixDQUFDLGVBQWUsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDO0lBQzNFLE9BQU8sRUFBRSxDQUFDLFlBQVksR0FBRyxTQUFTLEdBQUcsWUFBWSxDQUFDO0FBQ3BELENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgQWt2ZW8uIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMaWNlbnNlLnR4dCBpbiB0aGUgcHJvamVjdCByb290IGZvciBsaWNlbnNlIGluZm9ybWF0aW9uLlxuICovXG5cbmV4cG9ydCB0eXBlIE5iTnVsbGFibGVJbnB1dCA9IHN0cmluZyB8IG51bGwgfCB1bmRlZmluZWQ7XG5leHBvcnQgdHlwZSBOYkJvb2xlYW5JbnB1dCA9IGJvb2xlYW4gfCBOYk51bGxhYmxlSW5wdXQ7XG5cbmV4cG9ydCBmdW5jdGlvbiBjb252ZXJ0VG9Cb29sUHJvcGVydHkodmFsOiBhbnkpOiBib29sZWFuIHtcbiAgaWYgKHR5cGVvZiB2YWwgPT09ICdzdHJpbmcnKSB7XG4gICAgdmFsID0gdmFsLnRvTG93ZXJDYXNlKCkudHJpbSgpO1xuXG4gICAgcmV0dXJuIHZhbCA9PT0gJ3RydWUnIHx8IHZhbCA9PT0gJyc7XG4gIH1cblxuICByZXR1cm4gISF2YWw7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRFbGVtZW50SGVpZ2h0KGVsKSB7XG4gIC8qKlxuICAgKlxuICAgKiBUT0RPOiBNb3ZlIGhlbHBlcnMgaW4gc2VwYXJhdGUgY29tbW9uIG1vZHVsZS5cbiAgICogVE9ETzogUHJvdmlkZSB3aW5kb3cgdGhyb3VnaCBkaSB0b2tlbi5cbiAgICogKi9cbiAgY29uc3Qgc3R5bGUgPSB3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShlbCk7XG4gIGNvbnN0IG1hcmdpblRvcCA9IHBhcnNlSW50KHN0eWxlLmdldFByb3BlcnR5VmFsdWUoJ21hcmdpbi10b3AnKSwgMTApO1xuICBjb25zdCBtYXJnaW5Cb3R0b20gPSBwYXJzZUludChzdHlsZS5nZXRQcm9wZXJ0eVZhbHVlKCdtYXJnaW4tYm90dG9tJyksIDEwKTtcbiAgcmV0dXJuIGVsLm9mZnNldEhlaWdodCArIG1hcmdpblRvcCArIG1hcmdpbkJvdHRvbTtcbn1cbiJdfQ==